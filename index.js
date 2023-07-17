import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green('Welcome to chatbot program!'));
    console.log(colors.bold.green('You can start chatting with the bot.'));
    const chatHistory = []; // store conversation History

    while(true)
    {
        const userInput= readlineSync.question(colors.yellow('You: '));
        //construct messages by iterating over the history
        

        try{
            const messages = chatHistory.map(([role,content]) =>({role,content}));
            // Add the laster user input
            messages.push({role: 'user',content:userInput});
            // call the API with user Input
            const chatCompletion = await openai.createChatCompletion({
                model:'gpt-3.5-turbo',
                messages:messages,
                
            });

            // Get completion text/content
            const completionText = chatCompletion.data.choices[0].message.content;
            

            if(userInput.toLowerCase() ==='exit'){
                console.log(colors.green('Bot: ') + completionText);
                return;
            }
            
            console.log(colors.green('Bot: ') + completionText);

            //update history with user Input and assistant response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        }catch(error)
        {
            console.error(colors.red(error));
        }
    }

}
main();