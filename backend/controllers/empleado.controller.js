const Empleado = require('../models/empleado');
const empleadoCtrl = {};

// Obtener todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo empleado
empleadoCtrl.createEmpleados = async (req, res) => {
    try {
        const empleado = new Empleado({
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });
        await empleado.save();
        res.json({ status: 'Empleado guardado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener un solo empleado
empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    try {
        const empleadoUnico = await Empleado.findById(req.params.id);
        res.json(empleadoUnico);
    } catch (error) {
        res.status(404).json({ error: 'Empleado no encontrado' });
    }
};

// Editar/Actualizar empleado
empleadoCtrl.editarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleadoEdit = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };
        await Empleado.findByIdAndUpdate(id, { $set: empleadoEdit }, { new: true });
        res.json({ status: 'Empleado Actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar empleado
empleadoCtrl.eliminarEmpleado = async (req, res) => {
    try {
        await Empleado.findByIdAndDelete(req.params.id);
        res.json({ status: 'Empleado Eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = empleadoCtrl;