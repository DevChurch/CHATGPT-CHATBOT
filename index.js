import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    const userName= readlineSync.question(colors.yellow('Your Name? '));
    console.log(colors.bold.green('Hi ' + userName));
    console.log(colors.bold.green('Type anything to start chatting with the ChatGPT'));
    console.log(colors.bold.green('You can type exit anytime to quit.'));
    const chatHistory = []; // store conversation History
    
    while(true)
    {
        const userInput= readlineSync.question(colors.yellow(userName + ": " ));
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
                console.log(colors.green('ChatGPT: ') + completionText);
                return;
            }
            
            console.log(colors.green('ChatGPT: ') + completionText);

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