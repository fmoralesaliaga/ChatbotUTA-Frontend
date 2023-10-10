
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import axios from 'axios';

function EditDepartmentModal({ department, isOpen, onClose, fetchDepartments}) {

    const [editedDepartment, setEditedDepartment] = useState(department);

    // Función para manejar cambios en los campos de edición
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedDepartment({ ...editedDepartment, [name]: value });
    };
  
    // Función para enviar la solicitud de actualización al backend
    const handleUpdateDepartment = async () => {
      try {
        // Realiza una solicitud PUT al backend con los datos actualizados
        await axios.put(`http://localhost:3000/api/departments/${department.id}`, editedDepartment);
        fetchDepartments();
        onClose(); // Cierra el modal después de la actualización exitosa
      } catch (error) {
        console.error('Error al actualizar el departamento:', error);
      }
    };

  return (
    <ReactModal isOpen={isOpen}>

        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Editar Departamento
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={onClose}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                        <div className="relative p-6 flex-auto">
                            <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nombre
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="name"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                defaultValue={department.name}
                                                value={editedDepartment.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={handleUpdateDepartment}
                        >
                            Guardar Cambios
                        </button>
                        </div>
                </div>
            </div>
        </div>
    </ReactModal>
  );
}

export default EditDepartmentModal;
