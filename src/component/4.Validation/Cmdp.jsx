import { useState } from "react"


export default function Cmdp({submited,mdp,cmdpp,setCmdpp}) {

    function cmdp_val(){
        if(submited && cmdpp != mdp){
            return false
        }
        else{
            return true
        }
    }

  return (
    <>
        <label className="block mt-8"  htmlFor="c_mdp">Confirmation de votre mot de passe</label>
            <input value={cmdpp} onChange={(e)=>setCmdpp(e.target.value)} className="block border border-black mx-auto w-[450px] rounded p-2 mt-2" type="text"id="c_mdp" />

            {!cmdp_val() && <span className=" text-red-600 mb-8 block">Les deux mot de passe ne sont pas identiques</span>}
    </>
  )
}