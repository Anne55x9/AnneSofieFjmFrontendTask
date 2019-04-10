//The interface that models the '/stats' URI method attributes.

export interface Stats{

    count: {
        submitted:number;
        unknown:number;
        running: number;
        failed: number;
        terminated: number;
        successful: number;
    }; 
};