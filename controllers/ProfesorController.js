const Profesor = require('../model/Profesor')



module.exports.mostrar = async (req, res, next) => {
    try {
      const profesores = await Profesor.find();
      //res.json(profesores);
      return res.render('/index',{profesores:profesores})
      //console.log(profesores)
    } catch (error) {
      console.error('Error al obtener los profesores:', error);
      res.status(500).json({ message: 'Ocurrió un error al obtener los profesores' });
    }
  };

  module.exports.crear = async (req, res) => {
    try {
      
      const profesor = new Profesor({
        profesor: req.body.profesor,
        telefono: req.body.telefono,
        correo: req.body.correo,
        iae: req.body.iae,
        materias: req.body.materias,
      });
  
      await profesor.save();
      res.redirect('/index');
    } catch (error) {
      console.error('Error al crear el profesor:', error);
      res.status(500).json({ message: 'Error al crear el profesor' });
    }
  };

  

  module.exports.editar = async (req, res) => {
    try {
      function obtenerMaterias(req) {
        const materias = req.body.Materias_editar;
        
        //Verificamos si el texto contiene comas
        if (materias.includes(',')) {
          //Dividimos el texto en un arreglo utilizando la coma como separador
          const materias_arreglo = materias.split(',').map(materia => materia.trim());
          return materias_arreglo;
        } else {
          //Si no hay comas, simplemente creamos un arreglo con la materia completa
          return [materias.trim()];
        }
      }
      
      const id = req.body.id_editar;
      const profesor = req.body.Profesor_editar;
      const telefono = req.body.Telefono_editar;
      const correo = req.body.Correo_editar;
      const iae = req.body.IAE_editar;
      const materias = obtenerMaterias(req);


      
      const actualizarProfesor = {};//Objeto para almacenar los campos a actualizar
      if (profesor) {
        actualizarProfesor.profesor = profesor;
      }
      if (telefono) {
        actualizarProfesor.telefono = telefono;
      }
      if (correo) {
        actualizarProfesor.correo = correo;
      }
      if (iae) {
        actualizarProfesor.iae = iae;
      }
      if (materias) {
        actualizarProfesor.materias = materias;
      }

      const profesorActualizado = await Profesor.findByIdAndUpdate(id, actualizarProfesor, { new: true });

      if (!profesorActualizado) {
        return res.status(404).json({ mensaje: 'Profesor no encontrado' });
      }

      res.redirect('/index');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports.borrar = async (req, res) => {
    try {
      const id = req.params.id;
  
      const profesorEliminado = await Profesor.findByIdAndDelete(id);
  
      if (!profesorEliminado) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
  
      res.redirect('/index');
    } catch (error) {
      res.status(500).json({ message: 'Error eliminando el Profesor', error: error.message });
    }
  };

 