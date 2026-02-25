import AllSamplesPage from "./AllSamplesPage";
import DashboardPage from "./DashboardPage";
import Accounts from "../components/Accounts";
import FlaggedSamplesPage from "./FlaggedSamplesPage";
import SlidesPage from "./SlidesPage";
import ExceptionSlidesPage from "./ExceptionSlidesPage";
import BatchesPage from "./BatchesPage";
import SamplesPage from "./SamplesPage";
import SampleDetailsPage from './SampleDetailsPage';

export default function CustomOutlet({content}:{content: string}){
    return(
        <div className="h-[100vsh] overflow-y-auto">
            {content=='Dashboard'?
            <DashboardPage/>:null    
            }
            {content=='AllSamples'?
            <SamplesPage/>:null}
            {content=='FlaggedSamples'?<FlaggedSamplesPage/>:null}

            {content=='Slides'?<SampleDetailsPage/>:null}
            {content=='Accounts'?
            <Accounts/>:null}
             {content=='ExceptionSlides'?
            <ExceptionSlidesPage/>:null}

              {content=='Batches'?
            <BatchesPage/>:null}

        

        </div>
    )
}