    export type Sample = {
        id: string;
        patient: string;
        type: string;
        priority: "High" | "Medium" | "Low";
        status: "Processing" | "Completed" | "Flagged";
    };

   