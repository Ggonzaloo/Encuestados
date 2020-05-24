/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
  	if(parseInt(id)) this.modelo.borrarPregunta(id)
  },

  agregarVoto: function(idPregunta, respuestaSeleccionada) {
  	if(parseInt(idPregunta)) this.modelo.agregarVoto(idPregunta, respuestaSeleccionada)
  },

  editarPregunta: function(idPregunta, nombre) {
  	if(parseInt(idPregunta)) this.modelo.editarPregunta(idPregunta, nombre)
  },

  borrarPreguntas: function() {
    this.modelo.borrarPreguntas()
  },

};
