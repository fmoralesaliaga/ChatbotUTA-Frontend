import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

function CreateDepartmentModal({ isOpen, onClose, onCreate }) {

  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Agrega esta línea para ver el contenido de formData
    // Llama a la función onCreate para crear el usuario
    onCreate(formData);
    // Cierra el modal después de crear el usuario
    onClose();
  };

  return (
    <ReactModal isOpen={isOpen}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Crear Departamento
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
                                <form onSubmit={handleSubmit} className="sm:col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
                                                placeholder='Ingrese nombre del Usuario...'
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                      </div>
                                </form>
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
                            onClick={handleSubmit}
                        >
                            Crear Departamento
                        </button>
                        </div>
                </div>
            </div>
        </div>
    </ReactModal>
  );
}

export default CreateDepartmentModal;
