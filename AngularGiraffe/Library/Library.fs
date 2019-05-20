namespace Firmus.Data

open FSharp.Data

module StockProviders =
    open System

    type EuroNextStocks = CsvProvider<"./Library/EuroNext/Euronext_Equities_EU_2019-01-10.csv", ";">

    type StockDetail ={
            Symbol :string
            ISIN :string
            Name:string
            Open :float
            Last :float
            LastDateTime :string
            High :float
            Low :float
        }

        

    let GetEuroNextSymbols : seq<string> = 

        let euroNext = EuroNextStocks.Load("./EuroNext/Euronext_Equities_EU_2019-01-10.csv");
        seq { for row in euroNext.Rows do yield row.Symbol }

    let GetEuroNextRows : seq<StockDetail> = 

        let euroNext = EuroNextStocks.Load("./EuroNext/Euronext_Equities_EU_2019-01-10.csv");
        seq { for row in euroNext.Rows do  
                        yield { 
                            Symbol=row.Symbol; 
                            ISIN=row.ISIN;
                            Name=row.Name;
                            Last= row.Last; 
                            LastDateTime= row.``Last Date/Time``; 
                            High=row.High; 
                            Low=row.Low;
                            Open=row.Open 
                        }  
             }     
    
