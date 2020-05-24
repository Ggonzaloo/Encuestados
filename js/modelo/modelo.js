/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this)
  this.preguntaBorrada = new Evento(this)
  this.votoSumado = new Evento(this)
  this.preguntaEditada = new Evento(this)
  this.preguntasBorradas = new Evento(this)
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return (this.preguntas.length > 0) ? this.preguntas.reduce((a, b) => a > b.id ? a : b.id, 0) : 1
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  // método para borrar una pregunta del arreglo preguntas
  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id)
    this.guardar();
    this.preguntaBorrada.notificar()
  },

  // método para sumar un voto a la respuesta elegida
  agregarVoto: function(idPregunta, respuestaSeleccionada) {
    this.preguntas.forEach(pregunta =>
      pregunta.id == idPregunta ?
        pregunta.cantidadPorRespuesta.find(resp => resp.textoRespuesta == respuestaSeleccionada).cantidad += 1
        : null)
    this.guardar();
    this.votoSumado.notificar()
  },

  // método para editar una pregunta: toma el id de la pregunta y su nuevo nombre/titulo
  editarPregunta: function(idPregunta, nombre) {
    this.preguntas.forEach(pregunta =>
      pregunta.id == idPregunta ?
        pregunta.textoPregunta = nombre
        : null)
    this.guardar();
    this.preguntaEditada.notificar()
  },

  // método para borrar todas las preguntas de this.preguntas
  borrarPreguntas: function() {
    this.preguntas = []
    this.guardar();
    this.preguntasBorradas.notificar()
  },

  //se guardan las preguntas en localStorage
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas))
  }
};
