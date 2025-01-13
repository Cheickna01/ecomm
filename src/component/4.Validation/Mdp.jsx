import Cmdp from "./Cmdp"


export default function Mdp({submited,mdp,setMdp,cmdp,setCmdp}) {

    function mdp_val(){
        if(submited && (mdp.length<6 || !/\d/.test(mdp))){
            return false
        }
        else{
            return true
        }
    }

  return (
    <>
          <label className="block mt-8"  htmlFor="mdp">Votre mot de passe: au moins un chiffre et 6 caractères</label>
            <input value={mdp} onChange={(e)=>setMdp(e.target.value)} className="block border border-black mx-auto w-[450px] rounded p-2 mt-2" type="text" id="mdp"/>

            {!mdp_val() && <span className=" text-red-600 mb-8 block">Au moins 1 chiffre et 6 caractères</span>}

            <Cmdp submited={submited} mdp={mdp} cmdpp={cmdp} setCmdpp={setCmdp}/>

    </>
  )
}