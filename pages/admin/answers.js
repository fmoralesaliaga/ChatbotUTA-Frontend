import { useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import EditAnswerModal from '../../components/Modals/EditAnswerModal'; // Importa el componente de modal de edición
import CreateAnswerModal from '../../components/Modals/CreateAnswerModal';

const navigation = [
    { name: 'Usuarios', href: './users' },
    { name: 'Departamentos', href: './departments' },
    { name: 'Preguntas', href: './questions' },
    { name: 'Respuestas', href: './answers' },
]
  
export default function AnswersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/answers');
      setAnswers(response.data);
    } catch (error) {
      console.error('Error fetching respuestas:', error);
    }
  };

  // Función para abrir el modal de edición
  const openEditModal = (answer) => {
    setEditModalOpen(answer.id);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setEditModalOpen(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

   // Utiliza useEffect para cargar las respuestas cuando el componente se monte.
   useEffect(() => {
    fetchAnswers();
  }, []); // El segundo argumento (un array vacío) asegura que se ejecute solo una vez, cuando se monta el componente.

  const deleteAnswer = async (answerId) => {
    try {
      // Realiza una solicitud DELETE al servidor para eliminar el usuario por su ID
      await axios.delete(`http://localhost:3000/api/answers/${answerId}`);
  
      // Llama a la función fetchAnswers para actualizar la lista de respuestas después de la eliminación
      fetchAnswers();
    } catch (error) {
      console.error('Error al eliminar la respuesta:', error);
    }
  };

  const handleCreateAnswer = async (formData) => {
    try {
      await axios.post('http://localhost:3000/api/answers', formData);
      fetchAnswers(); // Actualiza la lista de respuestas después de crear uno nuevo
    } catch (error) {
      console.error('Error al crear la respuesta:', error);
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">UTA</span>
              <img
                className="h-24 w-auto"
                src="../logoutanegro.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir Menu Principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Cerrar Sesión <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="../" className="-m-1.5 p-1.5">
                <span className="sr-only">UTA</span>
                <img
                  className="h-16 w-auto"
                  src="../logoutanegro.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar Menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Cerrar Sesión
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#89a0fc] to-[#89f4fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                  <ul role="list" className="divide-y divide-gray-100">
                      {answers.map((answer) => (
                      <li key={answer.id} className="flex justify-between gap-x-6 py-5">
                          <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">{answer.text}</p>
                              </div>
                          </div>
                          <div className="flex min-w-0 gap-x-4">
              
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <div className="flex gap-x-6"> 
                                  <button className="-mx-1 block rounded-lg bg-emerald-600 px-5 py-2.5 text-base font-semibold text-white leading-7 text-gray-900 hover:bg-emerald-700" onClick={() => openEditModal(answer)}>
                                      Editar
                                  </button>
                                  {editModalOpen === answer.id && <EditAnswerModal answer={answer} isOpen={true} onClose={closeEditModal} fetchAnswers={fetchAnswers}/>}
                                  <button className="-mx-1 block rounded-lg bg-red-500 px-5 py-2.5 text-base font-semibold text-white leading-7 text-gray-900 hover:bg-red-600" onClick={() => deleteAnswer(answer.id)}>
                                      Eliminar
                                  </button>
                              </div>
                          </div>
                      </li>
                      ))}           
                  </ul>
              </div>
          </div>
          <button className="mx-auto max-w-2xl flex items-center justify-center block rounded-lg bg-blue-500 px-5 py-2.5 text-base font-semibold text-white leading-7 text-gray-900 hover:bg-blue-600" onClick={openCreateModal}>
              Crear Respuesta
          </button>
          {isCreateModalOpen && (<CreateAnswerModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onCreate={handleCreateAnswer}/>
        )}
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#89a0fc] to-[#89f4fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
      </div>
    </div>
  )
}
