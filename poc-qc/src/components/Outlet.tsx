import AllSamplesPage from "../components/AllSamplesPage";
import DashboardPage from "../components/DashboardPage";
import Accounts from "./Accounts";
import FlaggedSamplesPage from "./FlaggedSamplesPage";

export default function Outlet({content}:{content: string}){
    return(
        <div className="h-[100vsh] overflow-y-auto">
            {content=='Dashboard'?
            <DashboardPage/>:null    
            }
            {content=='AllSamples'?
            <AllSamplesPage/>:null}
              {content=='FlaggedSamples'?
            <FlaggedSamplesPage/>:null}
            {content=='Accounts'?
            <Accounts/>:null}
        </div>
    )
}