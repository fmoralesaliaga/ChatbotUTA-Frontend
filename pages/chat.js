import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

const navigation = [
]

export default function Chat() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching preguntas:', error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/answers');
      setAnswers(response.data);
    } catch (error) {
      console.error('Error fetching respuestas:', error);
    }
  };

  const groupedQuestions = questions.reduce((acc, question) => {
    if (question.parentQuestionId === null) {
      // Pregunta padre
      acc.push({ ...question, children: [] });
    } else {
      // Pregunta hija, agregala bajo su pregunta padre correspondiente
      const parentQuestion = acc.find((q) => q.id === question.parentQuestionId);
      if (parentQuestion) {
        parentQuestion.children.push(question);
      }
    }
    return acc;
  }, []);

     // Utiliza useEffect para cargar los usuarios cuando el componente se monte.
     useEffect(() => {
        fetchQuestions();
        fetchAnswers();
      }, []); // El segundo argumento (un array vacío) asegura que se ejecute solo una vez, cuando se monta el componente.

      function getAnswerText(questionId) {
        // Buscar la respuesta correspondiente en el estado 'answers'
        const answer = answers.find((answer) => answer.questionId === questionId);
      
        // Si se encuentra la respuesta, devolver su texto; de lo contrario, devolver un mensaje de error
        return answer ? answer.text : 'Respuesta no encontrada';
      } 

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">UTA</span>
              <img
                className="h-24 w-auto"
                src="logoutanegro.png"
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
              Iniciar Sesión <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">UTA</span>
                <img
                  className="h-16 w-auto"
                  src="logoutanegro.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menu</span>
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
                    href="/admin/users"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Iniciar Sesión
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

        <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#89a0fc] to-[#89f4fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>   
        <section className="text-gray-700">
            <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                Bienvenido a ChatBox UTA
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                Haznos tus preguntas relacionadas a la Universidad y la responderemos.
                </p>
            </div>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                <div className="w-full  px-4 py-2">
                <ul>
                    {groupedQuestions.map((group) => (
                    <li key={group.id}>
                        <details className="mb-4">
                        <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                            {group.text}
                        </summary>
                        {group.children.map((childQuestion) => (
                            <div key={childQuestion.id} className="ml-4">
                            <details>
                                <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">
                                {childQuestion.text}
                                </summary>
                                <span class="px-4 py-2">
                                {/* Aquí mostrarías la respuesta correspondiente */}
                                {getAnswerText(childQuestion.id)}
                            </span>
                            </details>
                            </div>
                        ))}
                        </details>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
        </section>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
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
