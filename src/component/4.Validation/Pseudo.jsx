
export default function Pseudo({submited,pseudo,setPseudo}) {

   
    function pseudo_val(){
        if(submited && (pseudo.length<3 || pseudo.length>64)){
            return false
        }
        else{
            return true
        }
    }



  return (
    <>
        <label htmlFor="pseudo">Votre pseudo [3 à 64 caractères]</label>
            <input value={pseudo} onChange={(e)=>setPseudo(e.target.value)} className="block border border-black  mx-auto w-[450px] rounded p-2 mt-2" type="text" name="" id="pseudo"/>

            {!pseudo_val() && <span className=" text-red-600 mb-8 block">Votre pseudo doit contenir au moins trois caractères et au plus 64</span>}
    </>
  )
}