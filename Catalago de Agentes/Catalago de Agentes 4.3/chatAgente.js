     // Selecionando os elementos do DOM
     const openButton = document.getElementById('chat-open-button');
     const closeButton = document.getElementById('chat-close-button');
     const chatWindow = document.getElementById('chat-window');
     const chatForm = document.getElementById('chat-form');
     const chatInput = document.getElementById('chat-input');
     const submitButton = document.getElementById('chat-submit-button');
     const messagesContainer = document.getElementById('chat-messages');

     // Função para abrir o chat
     function openChat() {
         openButton.classList.add('hidden');
         chatWindow.classList.remove('hidden');
         setTimeout(() => {
             chatWindow.classList.add('chat-window-enter-active');
         }, 10);
         chatInput.focus();
     }

     // Função para fechar o chat
     function closeChat() {
         chatWindow.classList.remove('chat-window-enter-active');
         setTimeout(() => {
             chatWindow.classList.add('hidden');
             openButton.classList.remove('hidden');
         }, 300);
     }

     openButton.addEventListener('click', openChat);
     closeButton.addEventListener('click', closeChat);

     // Função para adicionar uma mensagem à tela
     function addMessage(message, sender) {
         const messageDiv = document.createElement('div');
         messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : ''} mb-4`;
         
         let sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

         const messageContent = `
             <div class="bg-${sender === 'user' ? 'blue-500' : 'gray-700'} text-white rounded-lg ${sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'} p-3 max-w-xs">
                 <p class="text-sm">${sanitizedMessage}</p>
             </div>
         `;
         
         messageDiv.innerHTML = messageContent;
         messagesContainer.appendChild(messageDiv);
         messagesContainer.scrollTop = messagesContainer.scrollHeight;
     }

     // Funções para mostrar/esconder o indicador de "digitando"
     function showTypingIndicator() {
         const typingDiv = document.createElement('div');
         typingDiv.id = 'typing-indicator';
         typingDiv.className = 'flex mb-4';
         typingDiv.innerHTML = `
             <div class="bg-gray-700 rounded-lg rounded-bl-none p-3 max-w-xs flex items-center">
                 <div class="dot-flashing"></div>
             </div>
         `;
         messagesContainer.appendChild(typingDiv);
         messagesContainer.scrollTop = messagesContainer.scrollHeight;
     }

     function hideTypingIndicator() {
         const indicator = document.getElementById('typing-indicator');
         if (indicator) {
             indicator.remove();
         }
     }
     
     // Simula a chamada para a API do Google AI
     async function getGoogleAIResponse(userMessage) {
         // Simula um tempo de espera da rede
         await new Promise(resolve => setTimeout(resolve, 1500));
         
         // TODO: Substitua esta simulação pela sua chamada real ao Google AI SDK
         // Exemplo: const result = await aiModel.generateContent(userMessage);
         //          return result.response.text();
         
         return `Esta é uma resposta simulada para: "${userMessage}". Integração com serviço Google ADK.`;
     }


     // Função para gerar a resposta do agente
     async function handleAgentResponse(userMessage) {
         showTypingIndicator();
         chatInput.disabled = true;
         submitButton.disabled = true;

         try {
             const response = await getGoogleAIResponse(userMessage);
             addMessage(response, 'agent');
         } catch (error) {
             console.error("Erro ao obter resposta da IA:", error);
             addMessage("Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.", 'agent');
         } finally {
             hideTypingIndicator();
             chatInput.disabled = false;
             submitButton.disabled = false;
             chatInput.focus();
         }
     }

     // Evento de envio do formulário
     chatForm.addEventListener('submit', (e) => {
         e.preventDefault();
         const message = chatInput.value.trim();
         if (message) {
             addMessage(message, 'user');
             handleAgentResponse(message);
             chatInput.value = '';
         }
     });
