import AllSamplesPage from "./AllSamplesPage";
import DashboardPage from "./DashboardPage";
import Accounts from "../components/Accounts";
import FlaggedSamplesPage from "./FlaggedSamplesPage";
import SlidesPage from "./SlidesPage";

export default function Outlet({content}:{content: string}){
    return(
        <div className="h-[100vsh] overflow-y-auto">
            {content=='Dashboard'?
            <DashboardPage/>:null    
            }
            {content=='AllSamples'?
            <AllSamplesPage/>:null}
            {content=='FlaggedSamples'?<FlaggedSamplesPage/>:null}

            {content=='Slides'?<SlidesPage/>:null}
            {content=='Accounts'?
            <Accounts/>:null}

        </div>
    )
}