import os
import pandas as pd
import plotly.express as px
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import requests 


app = Flask(__name__)
CORS(app)


GEMINI_API_KEY = "AIzaSyDBfPQsUQsTKRrlOiTTRsgFjgfpsPdtC9M"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# --- Rutas de la aplicación ---
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/mapa")
def get_mapa_data():
    try:
        df = pd.read_csv("datos.csv")
    except FileNotFoundError:
        df = pd.DataFrame({"Municipio": ["Ejemplo"], "NumeroEstudiantes": [0], "Lat": [7.89], "Lon": [-72.50]})
    
    fig = px.scatter_map(df, lat="Lat", lon="Lon", hover_name="Municipio", hover_data={"NumeroEstudiantes": True}, color="NumeroEstudiantes", color_continuous_scale=px.colors.sequential.Plasma, size="NumeroEstudiantes", zoom=7.2, title="Número de Estudiantes por Municipio")
    fig.update_layout(mapbox_style="open-street-map", margin={"r":0, "t":40, "l":0, "b":0}, legend_title_text='N° Estudiantes')
    return fig.to_json()

# --- RUTA PARA EL CHAT CON GEMINI ---
@app.route("/api/chat", methods=['POST'])
def handle_chat():
   
    data = request.get_json()
    
    if not data or 'history' not in data:
        return jsonify({"error": "No se proporcionó historial de chat"}), 400

    user_message = data['history'][-1]['parts'][0]['text']

    # prompt para Gemini
    prompt = f"Eres un asistente virtual amigable y servicial para el proyecto EDU-TIC, una iniciativa para mejorar la educación en Norte de Santander, Colombia. Tu propósito es responder preguntas sobre el proyecto, la educación en la región, y dar consejos a estudiantes y educadores\
    ten encuenta que el proyecto EDU-TIC consiste tembien en analizar la desercion en la region para que las instituciones educativas tomen acciones he iniciativas para ayudar y evitar la desercion ademas es un proyecto escalable que se puede llevar a otros departamentos de colombia como dato adicional estas para ayudar de manera amigable a todo lo que pregunten ya sean personas del comun, un estudiante o un maestro. Sé conciso y útil. El usuario ha preguntado: \"{user_message}\""
    
    # se prepara la pa conexion
    payload = {
        "contents": [{
            "role": "user",
            "parts": [{"text": prompt}]
        }]
    }

    try:
        # Llama a la API de Gemini 
        response = requests.post(GEMINI_API_URL, json=payload)
        response.raise_for_status() 
        
        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con la API de Gemini: {e}")
        return jsonify({"error": "No se pudo conectar con la API de Gemini"}), 500


if __name__ == "__main__":
    app.run(debug=True)
