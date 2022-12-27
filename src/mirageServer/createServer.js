import { createServer } from "miragejs"

export default function createMirage() {
    createServer({
        routes() {
            this.get("/api/beers", () => ({
                beers: [
                    {
                        "Name": "Oktoberfest Bier",
                        "bitterness":30,
                        "color":"light",
                        "blg":13,
                        "style":"marzen",
                        "malts": [
                          {
                            "malt1": "Viena",
                            "malt2": "Munich",
                            "malt3": "Carmel 30"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "42",
                            "malt2": "53",
                            "malt3": "5"
                          }
                        ]
                    },
                    {
                        "Name": "Pilsner",
                        "bitterness":40,
                        "color":"light",
                        "blg":12,
                        "style":"pilsner",
                        "malts": [
                          {
                            "malt1": "Pilsner"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "100"
                          }
                        ]
                      },
                      {
                        "Name": "Desitka",
                        "bitterness":25,
                        "color":"light",
                        "blg":10,
                        "style":"lager",
                        "malts": [
                          {
                            "malt1": "Pilsner"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "100"
                          }
                        ]
                      },
                      {
                        "Name": "American India Pale Ale",
                        "bitterness":55,
                        "color":"medium",
                        "blg":17,
                        "style":"IPA",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Carmel 150"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "92",
                            "malt2": "8"
                          }
                        ]
                      },
                      {
                        "Name": "Pumpkin Ale",
                        "bitterness":25,
                        "color":"medium",
                        "blg":15,
                        "style":"ALE",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Carmel 150",
                            "malt3": "Carmel 30"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "88",
                            "malt2": "8",
                            "malt3": "4"
                          }
                        ]
                      },
                      {
                        "Name": "Witbier",
                        "bitterness":20,
                        "color":"light",
                        "blg":10,
                        "style":"witbier",
                        "malts": [
                          {
                            "malt1": "Pilsner",
                            "malt2": "Wheat Heidelberg"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "80",
                            "malt2": "20"
                          }
                        ]
                      },
                      {
                        "Name": "Altbier",
                        "bitterness":25,
                        "color":"dark",
                        "blg":12,
                        "style":"altbier",
                        "malts": [
                          {
                            "malt1": "Munich",
                            "malt2": "Viena"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "65",
                            "malt2": "35"
                          }
                        ]
                      },
                      {
                        "Name": "Stout",
                        "bitterness":25,
                        "color":"dark",
                        "blg":12,
                        "style":"stout",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Chocolate"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "95",
                            "malt2": "5"
                          }
                        ]
                      },
                      {
                        "Name": "Belgian Pale Ale",
                        "bitterness":65,
                        "color":"light",
                        "blg":13,
                        "style":"ALE",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Munich",
                            "malt3": "Melanoid",
                            "malt4": "Abbey"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "77",
                            "malt2": "9",
                            "malt3": "5",
                            "malt4": "9"
                          }
                        ]
                      },
                      {
                        "Name": "Pale Ale",
                        "bitterness":45,
                        "color":"light",
                        "blg":12,
                        "style":"ALE",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Munich",
                            "malt3": "Melanoid",
                            "malt4": "Abbey"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "77",
                            "malt2": "9",
                            "malt3": "5",
                            "malt4": "9"
                          }
                        ]
                      },
                      {
                        "Name": "American Pale Ale",
                        "bitterness":60,
                        "color":"medium",
                        "blg":17,
                        "style":"ALE",
                        "malts": [
                          {
                            "malt1": "Pale Ale",
                            "malt2": "Munich",
                            "malt3": "Melanoid",
                            "malt4": "Abbey"
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "77",
                            "malt2": "9",
                            "malt3": "5",
                            "malt4": "9"
                          }
                        ]
                      },
                      {
                        "Name": "Lite American Lager",
                        "bitterness":20,
                        "color":"light",
                        "blg":11.5,
                        "style":"LAGER",
                        "malts": [
                          {
                            "malt1": "Pilsner",
                            "malt2": "Munich",
                          }
                        ],
                        "maltPercent": [
                          {
                            "malt1": "77",
                            "malt2": "23",
                          }
                        ]
                      },
                ]
            }))
            this.get("/api/malts",()=>({
                malts: [
                    {
                        "id": 1,
                        "name": "Pilsner",
                        "producent": "Bestmalz",
                        "color": "light",
                        "ebc": 4
                      },
                      {
                        "id": 2,
                        "name": "Wheat Heidelberg",
                        "producent": "Bestmalz",
                        "color": "light",
                        "ebc": 3
                      },
                      {
                        "id": 3,
                        "name": "Munich",
                        "producent": "Bestmalz",
                        "color": "light",
                        "ebc": 15
                      },
                      {
                        "id": 4,
                        "name": "Pale Ale",
                        "producent": "Bestmalz",
                        "color": "light",
                        "ebc": 6
                      },
                      {
                        "id": 5,
                        "name": "Melanoid",
                        "producent": "Bestmalz",
                        "color": "middle",
                        "ebc": 70
                      },
                      {
                        "id": 6,
                        "name": "Abbey",
                        "producent": "Castlemalting",
                        "color": "middle",
                        "ebc": 45
                      },
                      {
                        "id": 7,
                        "name": "Carmel 150",
                        "producent": "Viking Malt",
                        "color": "brown",
                        "ebc": 150
                      },
                      {
                        "id": 8,
                        "name": "Carmel 30",
                        "producent": "Viking Malt",
                        "color": "middle",
                        "ebc": 30
                      },
                      {
                        "id": 9,
                        "name": "Chocolate",
                        "producent": "Viking Malt",
                        "color": "dark",
                        "ebc": 900
                      },
                      {
                        "id": 10,
                        "name": "Viena",
                        "producent": "Viking Malt",
                        "color": "light",
                        "ebc": 9
                      }
                ],
            }))
        },
    })
}
