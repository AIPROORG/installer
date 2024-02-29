import React, {useContext, useState} from 'react'
import { endpoints } from '../utils/endpoints';
// import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom';
import storageComunicator from '../utils/storageComunication';

const Step3Cui = () => {

    // const { authTokens } = useContext(AuthContext);
    const [ inputCui, setInputCui ] = useState(null);
    const [denumire, setDenumire] = useState(null);
    const [cui, setCui] = useState(null);
    const [cod_CAEN, setCod_CAEN] = useState(null);
    const [adresa, setAdresa] = useState(null);
    const [nr_employees, setNr_employees] = useState(null);
    const [codPostal, setCodPostal] = useState(null);
    const [data_inregistrare, setData_inregistrare] = useState(null);
    const [nrRegCom, setNrRegCom] = useState(null);
    const [stare_inregistrare, setStare_inregistrare] = useState(null);
    const [forma_de_proprietate, setForma_de_proprietate] = useState(null);
    const [forma_juridica, setForma_juridica] = useState(null);
    const [forma_organizare, setForma_organizare] = useState(null);
    const [organFiscalCompetent, setOrganFiscalCompetent] = useState(null);
    const [telefon, setTelefon] = useState(null);
    const [fax, setFax] = useState(null);
    const [iban, setIban] = useState(null);
    const [last_querry_date, setLast_querry_date] = useState(null);
    const [statusRO_e_Factura, setStatusRO_e_Factura] = useState(null);

    function setCompanyDetails(data){
        setDenumire(data.denumire)
        setCui(data.cui)
        setCod_CAEN(data.cod_CAEN)
        setAdresa(data.adresa)
        setNr_employees(data.nr_employees)
        setCodPostal(data.codPostal)
        setData_inregistrare(data.data_inregistrare)
        setNrRegCom(data.nrRegCom)
        setStare_inregistrare(data.stare_inregistrare)
        setForma_de_proprietate(data.forma_de_proprietate)
        setForma_juridica(data.forma_juridica)
        setForma_organizare(data.forma_organizare)
        setOrganFiscalCompetent(data.organFiscalCompetent)
        setTelefon(data.telefon)
        setFax(data.fax)
        setIban(data.iban)
        setLast_querry_date(data.last_querry_date)
        setStatusRO_e_Factura(data.statusRO_e_Factura)
    }

    const handleSubmit = async (e) => {
        console.log('submitting')
        console.log(e.target.cui.value)
        e.preventDefault();
        await fetch(endpoints.company.setCompany,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':'Bearer ' + String(storageComunicator.authToken.get().access),
                },
                body: JSON.stringify({ cui: e.target.cui.value }),

            }
        )
        .then(response => {
            if (response.ok) return response.json()
            else throw new Error("some error occured, my guess is that you are not authentificated or the server is down")
        })
        .then(data => {
            storageComunicator.company.set_info(data)
            setCompanyDetails(data)
        })
        .catch(error => alert(error))
    }



    return (
        <div className='steps-background flex items-center justify-center'>
            <div className="flex flex-col justify-center">
                <h1 className="text-lg font-bold text-start text-white underline">CUI-ul firmei tale este ?</h1>
                <form className='flex items-center space-x-2' onSubmit={handleSubmit}>
                    <input type="text" name="cui" value={inputCui} onChange={(e) => setInputCui(e.target.value)} className='block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    <button type="submit" className={`${cui === null ? 'block' : 'hidden'} focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}>Trimite CUI</button>
                    <button type="submit" className={`${cui === null ? 'hidden' : 'block'} focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}>Alt CUI</button>
                </form>

                <div className={`p-2 border rounded-xl bg-[rgba(255,255,255,0.75)] ${cui === null ? 'hidden' : 'block'}`}>
                    <div className="relative">
                        <h1 className="text-lg font-bold text-center text-green-600 underline">Este corect ?</h1>
                        <Link to="/step4" className={`absolute top-0 right-0 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}>Urmatorul pas</Link>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-4 mt-4 max-w-[500px]">
                        <div><h3 className="text-md font-medium text-wrap">Denumire:</h3><p>{denumire}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">CUI:</h3><p>{cui}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Cod CAEN:</h3><p>{cod_CAEN}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Adresa:</h3><p>{adresa}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Cod Postal:</h3><p>{codPostal}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Numar Angajati:</h3><p>{nr_employees}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Data Inregistrare:</h3><p>{data_inregistrare}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Numar Registrul Comertului:</h3><p>{nrRegCom}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Stare Inregistrare:</h3><p>{stare_inregistrare}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Forma de Proprietate:</h3><p>{forma_de_proprietate}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Forma Juridica:</h3><p>{forma_juridica}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Forma Organizare:</h3><p>{forma_organizare}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Organ Fiscal Competent:</h3><p>{organFiscalCompetent}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Telefon:</h3><p>{telefon}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Fax:</h3><p>{fax}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">IBAN:</h3><p>{iban}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Last Querry Date:</h3><p>{last_querry_date}</p></div>
                        <div><h3 className="text-md font-medium text-wrap">Status RO e Factura:</h3><p>{statusRO_e_Factura}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step3Cui