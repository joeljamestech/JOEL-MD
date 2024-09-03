const {zokou}=require("../framework/zokou")







zokou({nomCom:"restart",categorie:"Mods",reaction:"♻️"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for owner or joel_it");
  }

  const {exec}=require("child_process")

    repondre("joel md bot Restarting ♻️");

  exec("pm2 restart all");
  

  



})
