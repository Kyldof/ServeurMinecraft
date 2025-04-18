const {Rcon} = require('rcon-client');
const express = require("express")
const path = require("path");
const { exec } = require('child_process');

const app = express()

app.use(express.json())

const RCON_CONFIG = {
    host:"192.168.1.180",
    port:25575,
    password:"test",
}

async function isServerOnline(){
    try{
        const rcon = await Rcon.connect(RCON_CONFIG);
        await rcon.send("list");
        await rcon.end();
        return true;
    } catch(error){
        return false;
    }
}

function formatPlayerlist(reponse){
    const list = reponse.split(":")
    const players = list[1].split(", ").map(player => player.trim());
    return players
}

app.post("/player_list", async(req, res)=>{
    const command = "list";
    try{
        const rcon = await Rcon.connect(RCON_CONFIG);
        const reponse = await rcon.send(command)
        console.log(formatPlayerlist(reponse))
        await rcon.end()
        res.json({message : formatPlayerlist(reponse)});

    } catch (error){
        console.error(error)
        res.status(500).json({message : error})
    } 
})



app.post("/start", async(req, res)=>{
    console.log("état du serveur : ")
    const isOnline = await isServerOnline();
    if (isOnline){
        console.log("serveur déjà en ligne")
        return res.json({message : "Le serveur est déjà en ligne"})   
    }
    else {
        const scriptPath = path.resolve(__dirname, "..", "startserver.sh");
        const command = `screen -dmS minecraft bash ${scriptPath}`
        // console.log("suppression des session script 'Dead'...")
        // exec("screen -wipe", (error, stdout, stderr)=>{
        //     if(error){
        //         console.log(error)
        //         return res.status(500).json({error : stderr});
        //     }
        // }
        
        // )
        exec(command, (error, stdout, stderr)=>{
            if(error){
                console.log(error)
                return res.status(500).json({error : stderr});

            }
            res.json({message : "Démarrage du serveur Minecraft lancé."})
        })
    }
})

app.post("/send-command", async(req, res)=>{
    const {command} = req.body;
    console.log("commande reçu : ", command)
    try{
        const rcon = await Rcon.connect(RCON_CONFIG);
        const reponse = await rcon.send(command)
        await rcon.end()
        res.json({message : reponse});

    } catch (error){
        console.error(error)
        res.status(500).json({message : "erreur"})
    }
})


app.listen(3000, ()=>{
    console.log("API prête sur 192.168.1.180:3000")
})