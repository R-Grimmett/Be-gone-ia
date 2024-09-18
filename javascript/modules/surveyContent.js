const surveyJson = {
    "title": "Help My Plant!",
    "pages": [
        {
            "name": "plantIdentification",
            "title": "First, Lets Figure Out What the Plant is.",
            "description": "Identifying the plant will help us in figuring out what could be affecting it. If you don't know that's okay, but we will only be able to give generalised advice.",
            "elements": [
                {
                    "type": "panel",
                    "name": "CommonName",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "Know Common Name",
                            "title": "Do you know the Common Name of the Plant?\n",
                            "isRequired": true,
                            "labelTrue": "Yes",
                            "labelFalse": "No",
                            "swapOrder": true
                        },
                        {
                            "type": "text",
                            "name": "What Common Name",
                            "visibleIf": "{Know Common Name} = true",
                            "title": "What is the Common Name of the Plant?",
                            "hideNumber": true,
                            "requiredIf": "{Know Common Name} = true",
                            "placeholder": "Enter the Common Name here:"
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "question3",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "Know Botanical Name",
                            "title": "Do You Know the Botanical Name of the Plant?",
                            "isRequired": true,
                            "swapOrder": true
                        },
                        {
                            "type": "multipletext",
                            "name": "What Botanical Name",
                            "visibleIf": "{Know Botanical Name} = true",
                            "title": "What is the Botanical Name of the Plant?",
                            "description": "Enter the Genus or the Genus and Species Name.",
                            "hideNumber": true,
                            "requiredIf": "{Know Botanical Name} = true",
                            "items": [
                                {
                                    "name": "text1",
                                    "title": "Genus"
                                },
                                {
                                    "name": "text2",
                                    "title": "Species Name"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "dropdown",
                    "name": "What Kind or Plant is it?",
                    "visibleIf": "{Know Botanical Name} = false and {Know Common Name} = false",
                    "title": "What kind of Plant is it?",
                    "requiredIf": "{Know Botanical Name} = false and {Know Common Name} = false",
                    "choices": [
                        {
                            "value": "Item 1",
                            "text": "Cacti or Succulent"
                        },
                        {
                            "value": "Item 2",
                            "text": "Shrub or Foliage Plant"
                        },
                        {
                            "value": "Item 3",
                            "text": "Tree (Either Fruit or Ornamental)"
                        },
                        {
                            "value": "Item 4",
                            "text": "Vegetable"
                        },
                        {
                            "value": "Item 5",
                            "text": "Herb"
                        },
                        {
                            "value": "Item 6",
                            "text": "Flowering Plant"
                        },
                        {
                            "value": "Item 7",
                            "text": "Not Sure/Unkown"
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "panel1",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "Know old?",
                            "title": "Do you know how old the plant is?\n",
                            "isRequired": true,
                            "swapOrder": true
                        },
                        {
                            "type": "text",
                            "name": "How old",
                            "visibleIf": "{Know old?} = true",
                            "title": "How old is the plant in years?",
                            "hideNumber": true,
                            "requiredIf": "{Know old?} = true",
                            "inputType": "number",
                            "min": 0
                        }
                    ]
                }
            ]
        },
        {
            "name": "plantSymptoms",
            "title": "Symptoms and Signs Shown",
            "description": "Some of the symptoms we ask you to check for may require a thorough inspection of the plant itself. Be prepared to spend some time flipping leaves and prodding soil if you haven't already.",
            "elements": [
                {
                    "type": "panel",
                    "name": "panel2",
                    "elements": [
                        {
                            "type": "multipletext",
                            "name": "How long symptoms",
                            "title": "How long ago did the symptoms appear?",
                            "description": "If you don't know specifically that's ok, just enter your best guess.",
                            "items": [
                                {
                                    "name": "Days",
                                    "title": "Days"
                                },
                                {
                                    "name": "Months",
                                    "title": "Months"
                                },
                                {
                                    "name": "Years",
                                    "title": "Years"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "panel3",
                    "elements": [
                        {
                            "type": "checkbox",
                            "name": "symptoms",
                            "title": "What parts of the plant are affected?",
                            "isRequired": true,
                            "choices": [
                                {
                                    "value": "leaf",
                                    "text": "Leaves"
                                },
                                {
                                    "value": "stem",
                                    "text": "Stems"
                                },
                                {
                                    "value": "growth",
                                    "text": "New Growth or Overall Growth of the Plant"
                                },
                                {
                                    "value": "base",
                                    "text": "Base of the Plant"
                                },
                                {
                                    "value": "root",
                                    "text": "Roots"
                                }
                            ],
                            "choicesOrder": "asc",
                            "minSelectedChoices": 1
                        },
                        {
                            "type": "checkbox",
                            "name": "Leaf Symptoms",
                            "state": "expanded",
                            "visibleIf": "{symptoms} contains 'leaf'",
                            "title": "What do the symptoms on the plant's leaves look like?\n",
                            "hideNumber": true,
                            "requiredIf": "{symptoms} contains 'leaf'",
                            "choices": [
                                {
                                    "value": "yellow",
                                    "text": "Yellowing or Yellow Blotches"
                                },
                                {
                                    "value": "brown",
                                    "text": "Leaves are Turning Brown"
                                },
                                {
                                    "value": "pinpoint",
                                    "text": "Tiny White or Yellow Pinpoint Marks on the Edges"
                                },
                                {
                                    "value": "white",
                                    "text": "Leaves that look almost entirely White or Silvery"
                                },
                                {
                                    "value": "mottled",
                                    "text": "Mottled effect on the Leaves"
                                },
                                {
                                    "value": "blackSpots",
                                    "text": "Black Spots on the Leaves"
                                },
                                {
                                    "value": "rust",
                                    "text": "Rust-Coloured Patches on the Leaves"
                                },
                                {
                                    "value": "sticky",
                                    "text": "Sticky Substances on the Leaves"
                                },
                                {
                                    "value": "whitePowder",
                                    "text": "White Powdery Substance on the Leaves"
                                },
                                {
                                    "value": "blackPowder",
                                    "text": "Black Powdery Substance on the Leaves"
                                },
                                {
                                    "value": "fineWebs",
                                    "text": "Fine Silvery Webs covering Leaves"
                                },
                                {
                                    "value": "scale",
                                    "text": "Small Ovals scattered across Leaves"
                                },
                                {
                                    "value": "distorted",
                                    "text": "Leaf shape is Distorted"
                                },
                                {
                                    "value": "drop",
                                    "text": "Leaves are Dropping"
                                }
                            ],
                            "minSelectedChoices": 1
                        },
                        {
                            "type": "checkbox",
                            "name": "stem",
                            "state": "expanded",
                            "visibleIf": "{symptoms} contains 'stem'",
                            "title": "What do the Symptoms on the Plant's Stem Look Like?",
                            "hideNumber": true,
                            "requiredIf": "{symptoms} contains 'stem'",
                            "choices": [
                                {
                                    "value": "moist",
                                    "text": "Moist or Wilting Areas Within a Stem"
                                },
                                {
                                    "value": "fall",
                                    "text": "Stem is Falling Over"
                                },
                                {
                                    "value": "sticky",
                                    "text": "Sticky Substance on the Stem"
                                },
                                {
                                    "value": "whitePowder",
                                    "text": "White Powdery substance on the Stem"
                                },
                                {
                                    "value": "blackPowder",
                                    "text": "Black Powdery substance on the Stem"
                                },
                                {
                                    "value": "web",
                                    "text": "Fine Silvery Webs covering the Stem"
                                },
                                {
                                    "value": "oval",
                                    "text": "Small Ovals scattered across the Stem"
                                },
                                {
                                    "value": "lump",
                                    "text": "Lumpy or Bumpy Clusters of Oval Shells"
                                },
                                {
                                    "value": "insect",
                                    "text": "Visible Clusters of Insects or Bugs"
                                }
                            ],
                            "minSelectedChoices": 1
                        },
                        {
                            "type": "checkbox",
                            "name": "growth",
                            "state": "expanded",
                            "visibleIf": "{symptoms} contains 'growth'",
                            "title": "What do the Symptoms Affecting the Plant's New or Overall Growth Look Like?",
                            "hideNumber": true,
                            "requiredIf": "{symptoms} contains 'growth'",
                            "choices": [
                                {
                                    "value": "deformed",
                                    "text": "New Growth of the Plant is Deformed"
                                },
                                {
                                    "value": "distorted",
                                    "text": "New Growth of the Plant is Distorted"
                                },
                                {
                                    "value": "slow",
                                    "text": "Slow to No New Growth of the Plant"
                                },
                                {
                                    "value": "sticky",
                                    "text": "Sticky Substance present on New Growth"
                                },
                                {
                                    "value": "whitePowder",
                                    "text": "White Powdery Substance on New Growth of the Plant"
                                },
                                {
                                    "value": "blackPowder",
                                    "text": "Black Powdery Substance on New Growth of the Plant"
                                },
                                {
                                    "value": "web",
                                    "text": "Fine Silvery Webs Covering New Leaves"
                                },
                                {
                                    "value": "insect",
                                    "text": "Visible Clusters of Insects or Bugs present on New Growth"
                                }
                            ]
                        },
                        {
                            "type": "checkbox",
                            "name": "base",
                            "state": "expanded",
                            "visibleIf": "{symptoms} contains 'base'",
                            "title": "What do the Symptoms Affecting the Base of the Plant Look Like?",
                            "hideNumber": true,
                            "requiredIf": "{symptoms} contains 'base'",
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        },
                        {
                            "type": "checkbox",
                            "name": "root",
                            "state": "expanded",
                            "visibleIf": "{symptoms} contains 'root'",
                            "title": "What do the Symptoms Affecting the Roots of the Plant Look Like?",
                            "hideNumber": true,
                            "requiredIf": "{symptoms} contains 'root'",
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        }
                    ]
                },
                {
                    "type": "rating",
                    "name": "affectedPortion",
                    "title": "On a Scale of 1 to 10, how much of the Plant is Affected?\n",
                    "description": "Where 1 is 'Very Little or Almost Not Affected'\nand 10 is 'The Whole Plant",
                    "isRequired": true,
                    "rateCount": 10,
                    "rateMax": 10,
                    "displayMode": "buttons"
                },
                {
                    "type": "radiogroup",
                    "name": "whereSymptomsStart",
                    "title": "Where did the Symptoms First Appear on the Plant?",
                    "choices": [
                        {
                            "value": "leaf",
                            "text": "Leaves of the Plant"
                        },
                        {
                            "value": "stem",
                            "text": "Stems of the Plant"
                        },
                        {
                            "value": "base",
                            "text": "Base of the Plant"
                        },
                        {
                            "value": "root",
                            "text": "Roots of the Plant"
                        },
                        {
                            "value": "growth",
                            "text": "New Growth or Overall Growth of the Plant"
                        },
                        {
                            "value": "unknown",
                            "text": "Not Sure or Unknown"
                        }
                    ]
                },
                {
                    "type": "boolean",
                    "name": "symptomPattern",
                    "title": "Is there a Pattern to the Parts of the Plant that are Affected?",
                    "isRequired": true,
                    "swapOrder": true
                },
                {
                    "type": "boolean",
                    "name": "nearbyPlants",
                    "title": "Are other Nearby Plants also affected?",
                    "isRequired": true,
                    "swapOrder": true
                }
            ]
        },
        {
            "name": "plantEnvironment",
            "title": "Environmental or Care Related Factors",
            "description": "Often clues for what is affecting a plant can also come from how you care for the plant and its immediate surroundings",
            "elements": [
                {
                    "type": "panel",
                    "name": "waterPanel",
                    "elements": [
                        {
                            "type": "dropdown",
                            "name": "waterFrequency",
                            "title": "How often do you Water the Plant?",
                            "isRequired": true,
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        },
                        {
                            "type": "dropdown",
                            "name": "waterAmount",
                            "title": "When you Water, approximately how much Water do you Give the Plant?",
                            "isRequired": true,
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        },
                        {
                            "type": "radiogroup",
                            "name": "waterStyle",
                            "title": "How do you Water the Plant?",
                            "isRequired": true,
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "mulchPanel",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "mulchPresent",
                            "title": "Is there Mulch around the Plant?",
                            "isRequired": true,
                            "swapOrder": true
                        },
                        {
                            "type": "boolean",
                            "name": "mulchMoist",
                            "visibleIf": "{mulchPresent} = true",
                            "title": "Is the soil underneath the Mulch Moist?",
                            "hideNumber": true,
                            "requiredIf": "{mulchPresent} = true",
                            "swapOrder": true
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "fertiliserPanel",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "fertilise",
                            "title": "Do you Fertilise the Plant?",
                            "swapOrder": true
                        },
                        {
                            "type": "text",
                            "name": "question1",
                            "visibleIf": "{fertilise} = true",
                            "title": "What kind of Fertiliser do you use?",
                            "hideNumber": true,
                            "requiredIf": "{fertilise} = true"
                        },
                        {
                            "type": "dropdown",
                            "name": "question2",
                            "visibleIf": "{fertilise} = true",
                            "title": "How Often do you Fertilise the Plant?",
                            "hideNumber": true,
                            "requiredIf": "{fertilise} = true",
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3"
                            ]
                        }
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "light",
                    "title": "What Light Conditions is the Plant in?",
                    "choices": [
                        {
                            "value": "full",
                            "text": "Full Sun"
                        },
                        {
                            "value": "partial",
                            "text": "Partial Sun"
                        },
                        {
                            "value": "shade",
                            "text": "Full Shade"
                        },
                        {
                            "value": "indirect",
                            "text": "Indirect Light"
                        },
                        {
                            "value": "indoorFull",
                            "text": "Indoors Full Sun"
                        },
                        {
                            "value": "indoorPartial",
                            "text": "Indoors Partial Sun"
                        },
                        {
                            "value": "indoorShade",
                            "text": "Indoors Full Shade"
                        },
                        {
                            "value": "growLight",
                            "text": "Plant is under a Grow Light"
                        }
                    ]
                }
            ]
        }
    ],

    "showTitle": false,
    "showPageNumbers": true

};