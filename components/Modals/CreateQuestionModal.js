import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

function CreateQuestionModal({ isOpen, onClose, onCreate }) {

  const [departments, setDepartments] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [formData, setFormData] = useState({
    text: '',
    type: 'public',
    departmentId: null,
    answerId: null,
    parentQuestionId: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'departmentId' ? parseInt(e.target.value) : e.target.value,
    });
    console.log("formData.departmentId:", formData.departmentId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Agrega esta línea para ver el contenido de formData
    // Llama a la función onCreate para crear el usuario
    onCreate(formData);
    // Cierra el modal después de crear el usuario
    onClose();
  };

  const loadDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departamentos:', error);
    }
  };

  const loadQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/questions');
      setQuestions(response.data);
      console.log("Preguntas cargadas correctamente:", response.data);
    } catch (error) {
      console.error('Error fetching preguntas:', error);
    }
  };

  const [filteredParentQuestions, setFilteredParentQuestions] = useState([]);

  useEffect(() => {
    // Llama a una función que carga los perfiles disponibles y los almacena en el estado local.
    loadDepartments();
    loadQuestions();
  }, []); // Este efecto se ejecuta solo una vez, cuando se abre el modal.

  useEffect(() => {
    if (formData.departmentId) {
      // Realiza la lógica de filtrado aquí para obtener las preguntas del departamento seleccionado
      const filteredQuestions = questions.filter((question) => {
        return question.departmentId === formData.departmentId;
      });
      setFilteredParentQuestions(filteredQuestions);
      console.log("filteredQuestions:", filteredQuestions);
    } else {
      // Si no se selecciona un departamento, muestra todas las preguntas
      setFilteredParentQuestions(questions);
    }
  }, [formData.departmentId, questions]);
  

  return (
    <ReactModal isOpen={isOpen}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Crear Pregunta
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
                                        Texto
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="text"
                                                id="text"
                                                autoComplete="text"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder='Ingrese texto de la pregunta...'
                                                value={formData.text}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <br></br>
                                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                                        Tipo de Pregunta
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <select
                                                type="type"
                                                name="type"
                                                id="type"
                                                autoComplete="type"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                defaultValue={formData.type}
                                                value={formData.type}
                                                onChange={handleChange}
                                            >
                                            <option value="public">Pública</option>
                                            <option value="private">Privada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br></br>
                                    <label htmlFor="profile" className="block text-sm font-medium leading-6 text-gray-900">
                                        Departamento
                                    </label>
                                    <div className='mt-2'>
                                    <select
                                    name="departmentId"
                                    id="departmentId"
                                    value={formData.departmentId}
                                    onChange={handleChange}
                                  >
                                    <option value="">Selecciona un departamento</option>
                                    {departments.map((department) => (
                                      <option key={department.id} value={department.id}>
                                        {department.name}
                                      </option>
                                    ))}
                                  </select>
                                    </div>
                                    <br></br>
                                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">
                                        Herencia de Pregunta
                                    </label>
                                    <div className='mt-2'>
                                    <select
                                        name="parentQuestionId"
                                        id="parentQuestion"
                                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={formData.parentQuestionId || ''}
                                        onChange={handleChange}
                                    >
                                        <option value={null}>Esta pregunta no tiene padre</option>
                                        {filteredParentQuestions.map((question) => (
                                            <option key={question.id} value={question.id}>
                                                {question.text}
                                            </option>
                                        ))}
                                    </select>
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
                            Crear Pregunta
                        </button>
                        </div>
                </div>
            </div>
        </div>
    </ReactModal>
  );
}

export default CreateQuestionModal;
