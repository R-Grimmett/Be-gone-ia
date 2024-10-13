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
                "name": "commonPanel",
                "elements": [
                    {
                        "type": "boolean",
                        "name": "commonKnow",
                        "title": "Do you know the Common Name of the Plant?\n",
                        "isRequired": true,
                        "labelTrue": "Yes",
                        "labelFalse": "No",
                        "swapOrder": true
                    },
                    {
                        "type": "text",
                        "name": "commonName",
                        "visibleIf": "{commonKnow} = true",
                        "title": "What is the Common Name of the Plant?",
                        "hideNumber": true,
                        "requiredIf": "{commonKnow} = true",
                        "placeholder": "Enter the Common Name here:"
                    }
                ]
            },
            {
                "type": "panel",
                "name": "botanicalPanel",
                "elements": [
                    {
                        "type": "boolean",
                        "name": "botanicalKnow",
                        "title": "Do You Know the Botanical Name of the Plant?",
                        "isRequired": true,
                        "swapOrder": true
                    },
                    {
                        "type": "multipletext",
                        "name": "botanicalName",
                        "visibleIf": "{botanicalKnow} = true",
                        "title": "What is the Botanical Name of the Plant?",
                        "description": "Enter the Genus or the Genus and Species Name.",
                        "hideNumber": true,
                        "requiredIf": "{botanicalKnow} = true",
                        "items": [
                            {
                                "name": "genus",
                                "title": "Genus"
                            },
                            {
                                "name": "species",
                                "title": "Species Name"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "dropdown",
                "name": "plantType",
                "visibleIf": "{botanicalKnow} = false and {commonKnow} = false",
                "title": "What kind of Plant is it?",
                "requiredIf": "{botanicalKnow} = false and {commonKnow} = false",
                "choices": [
                    {
                        "value": "cactus",
                        "text": "Cacti or Succulent"
                    },
                    {
                        "value": "foliage",
                        "text": "Shrub or Foliage Plant"
                    },
                    {
                        "value": "tree",
                        "text": "Tree (Either Fruit or Ornamental)"
                    },
                    {
                        "value": "vegetable",
                        "text": "Vegetable"
                    },
                    {
                        "value": "herb",
                        "text": "Herb"
                    },
                    {
                        "value": "flower",
                        "text": "Flowering Plant"
                    },
                    {
                        "value": "unknown",
                        "text": "Not Sure/Unkown"
                    }
                ]
            },
            {
                "type": "panel",
                "name": "age-panel",
                "elements": [
                    {
                        "type": "boolean",
                        "name": "ageKnow",
                        "title": "Do you know how old the plant is?\n",
                        "isRequired": true,
                        "swapOrder": true
                    },
                    {
                        "type": "text",
                        "name": "age",
                        "visibleIf": "{age-know} = true",
                        "title": "How old is the plant in years?",
                        "hideNumber": true,
                        "requiredIf": "{age-know} = true",
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
                "name": "affected-time-panel",
                "elements": [
                    {
                        "type": "multipletext",
                        "name": "affectedTime",
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
                "name": "symptom-panel",
                "elements": [
                    {
                        "type": "checkbox",
                        "name": "symptom",
                        "title": "What parts of the plant are affected?",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "leaf",
                                "text": "Leaves"
                            },
                            {
                                "value": "flower",
                                "text": "Flowers"
                            },
                            {
                                "value": "stem",
                                "text": "Stems"
                            },
                            {
                                "value": "root",
                                "text": "Roots"
                            },
                            {
                                "value": "growth",
                                "text": "New growth or overall growth of the plant"
                            },
                            {
                                "value": "whole",
                                "text": "Symptoms are covering the entire plant"
                            }
                        ],
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomLeaf",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'leaf'",
                        "title": "What do the symptoms on the plant's leaves look like?\n",
                        "description": "Select all that match",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'leaf'",
                        "choices": [
                            {
                                "value": "blotch-brown",
                                "text": "Brown blotches on the leaves"
                            },
                            {
                                "value": "blotch-downy",
                                "text": "Purple or green blotches on the leaves"
                            },
                            {
                                "value": "blotch-yellow",
                                "text": "Yellow blotches on the leaves"
                            },
                            {
                                "value": "curled",
                                "text": "Distorted or curled leaves"
                            },
                            {
                                "value": "dropped",
                                "text": "Leaves are being dropped"
                            },
                            {
                                "value": "growth-mold",
                                "text": "Mold-like growth on the undersides of leaves"
                            },
                            {
                                "value": "growth-rust",
                                "text": "Rust coloured pustules on the undersides of leaves"
                            },
                            {
                                "value": "insect",
                                "text": "Insects are visible on the leaves"
                            },
                            {
                                "value": "leaf-black",
                                "text": "Leaves are black"
                            },
                            {
                                "value": "leaf-brown",
                                "text": "Leaves are brown"
                            },
                            {
                                "value": "leaf-mottled",
                                "text": "Leaves are mottled"
                            },
                            {
                                "value": "leaf-pale",
                                "text": "Leaves are pale or desaturated in colour"
                            },
                            {
                                "value": "leaf-red",
                                "text": "Leaves are red in colour"
                            },
                            {
                                "value": "leaf-silvery",
                                "text": "Leaves are silvery, or have silvery tracks or spots on them"
                            },
                            {
                                "value": "leaf-skeleton",
                                "text": "Leaves are turning skeletal"
                            },
                            {
                                "value": "leaf-translucent",
                                "text": "Leaves are translucent"
                            },
                            {
                                "value": "mosaic",
                                "text": "Mosaic pattern on the leaves"
                            },
                            {
                                "value": "mush",
                                "text": "Leaves are turning mushy in spots or blotches"
                            },
                            {
                                "value": "notch",
                                "text": "Notches are missing from the edges of leaves"
                            },
                            {
                                "value": "odema",
                                "text": "Small bumps are forming on the leaves"
                            },
                            {
                                "value": "ring",
                                "text": "Ring patterns on the leaves"
                            },
                            {
                                "value": "scab",
                                "text": "Light brown patches or raised scabs of a light brown colour"
                            },
                            {
                                "value": "scale",
                                "text": "Small, hard, white bumps or shells"
                            },
                            {
                                "value": "scorch",
                                "text": "Leaves have portions of brown or black that appear similar to a burn"
                            },
                            {
                                "value": "speck",
                                "text": "Yellowish swelling or specks on the undersides of leaves"
                            },
                            {
                                "value": "spot-brown",
                                "text": "Black or brown spots on the leaves"
                            },
                            {
                                "value": "spot-black",
                                "text": "Tiny black spots on the leaves"
                            },
                            {
                                "value": "streak-pale",
                                "text": "Pale green or yellow streaks throughout the leaves"
                            },
                            {
                                "value": "substance-fluffy",
                                "text": "White, fluffy substance on the leaves"
                            },
                            {
                                "value": "substance-mold",
                                "text": "Fuzzy grey mold on the leaves"
                            },
                            {
                                "value": "substance-sticky",
                                "text": "Sticky substance on the leaves"
                            },
                            {
                                "value": "substance-web",
                                "text": "Small silvery webs on the leaves of the plant"
                            },
                            {
                                "value": "substance-white",
                                "text": "White powdery substance on the leaves"
                            }
                        ],
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "dropdown",
                        "name": "leafInsect",
                        "state": "expanded",
                        "visibleIf": "{symptom-leaf} contains 'insect'",
                        "title": "We saw you mentioned seeing insects on the leaves, do they look like any of the following?",
                        "hideNumber": true,
                        "requiredIf": "{symptom-leaf} contains 'insect'",
                        "choices": [
                            {
                                "value": "aphid",
                                "text": "Small insects, black or green in colour, about 1-7mm in length"
                            },
                            {
                                "value": "pale-green",
                                "text": "Small pale green insects about 3mm in length that fly small distances when disturbed."
                            },
                            {
                                "value": "cloud",
                                "text": "Clouds of insects flying around the plant"
                            },
                            {
                                "value": "night",
                                "text": "Small insects that only appear at night"
                            },
                            {
                                "value": "black",
                                "text": "Small black insects"
                            },
                            {
                                "value": "other",
                                "text": "They look like something else"
                            }
                        ],
                        "choicesOrder": "asc"
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomFlower",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'flower'",
                        "title": "What do the symptoms affecting the plant's flowers look like?",
                        "description": "Select all that match",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'flower'",
                        "choices": [
                            {
                                "value": "black",
                                "text": "Flower buds are black"
                            },
                            {
                                "value": "drop",
                                "text": "Flower bugs are dropping before they flower"
                            },
                            {
                                "value": "none",
                                "text": "No flowers are forming"
                            },
                            {
                                "value": "pale",
                                "text": "New flowers are pale or desaturated"
                            },
                            {
                                "value": "substance-sticky",
                                "text": "Flowers have a sticky substance on them"
                            },
                            {
                                "value": "substance-white",
                                "text": "Flowers have a white, powdery substance on them"
                            },
                            {
                                "value": "white",
                                "text": "Flowers have white or pale streaks in them"
                            }
                        ],
                        "choicesOrder": "asc",
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomStem",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'stem'",
                        "title": "What do the Symptoms on the Plant's Stem Look Like?",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'stem'",
                        "choices": [
                            {
                                "value": "black",
                                "text": "Stem tips are black"
                            },
                            {
                                "value": "etiolated",
                                "text": "Stems are etiolated, lopsided, or 'stretched out'"
                            },
                            {
                                "value": "insect",
                                "text": "Clusters of insects around 1-7mm in length"
                            },
                            {
                                "value": "mark-brown",
                                "text": "Brown marks on the stems"
                            },
                            {
                                "value": "mark-wet",
                                "text": "Stems have brown patches with a wet appearance to them"
                            },
                            {
                                "value": "scale",
                                "text": "Small, hard bumps or scales on the stems"
                            },
                            {
                                "value": "scorch",
                                "text": "Stems have burn marks or pale brown patches"
                            },
                            {
                                "value": "substance-fluffy",
                                "text": "Stems have a white, fluffy substance on them"
                            },
                            {
                                "value": "substance-sticky",
                                "text": "There is a sticky substance on the stems"
                            },
                            {
                                "value": "substance-web",
                                "text": "Silky webs are present on the stems"
                            }
                        ],
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomRoot",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'root'",
                        "title": "What do the symptoms affecting the roots of the plant look like?",
                        "description": "Select all that match",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'root'",
                        "choices": [
                            {
                                "value": "rot",
                                "text": "Roots are mushy, dark brown, or black"
                            },
                            {
                                "value": "insect",
                                "text": "Small insects during the day"
                            },
                            {
                                "value": "maggot",
                                "text": "Small white larvae can be seen in the soil"
                            },
                            {
                                "value": "aphid",
                                "text": "Small black or green bugs in the soil"
                            },
                            {
                                "value": "wool",
                                "text": "White woolly clumps next to or on the roots"
                            },
                            {
                                "value": "grub",
                                "text": "Roots are damages, or there are white grubs with brown heads in the soil"
                            }
                        ],
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomGrowth",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'growth'",
                        "title": "What do the symptoms affecting the plant's new or overall growth look like?",
                        "description": "Select all that match",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'growth'",
                        "choices": [
                            {
                                "value": "slow",
                                "text": "New growth is slow or stunted"
                            },
                            {
                                "value": "etiolated",
                                "text": "New growth is etiolated, lopsided, or 'stretched out'"
                            },
                            {
                                "value": "fast",
                                "text": "New growth is rapid, and is softer than usual"
                            },
                            {
                                "value": "distorted",
                                "text": "New growth is distorted"
                            }
                        ],
                        "choicesOrder": "asc",
                        "minSelectedChoices": 1
                    },
                    {
                        "type": "checkbox",
                        "name": "symptomWhole",
                        "state": "expanded",
                        "visibleIf": "{symptom} contains 'whole'",
                        "title": "What do the symptoms affecting the whole plant look like?",
                        "description": "Select all that match",
                        "hideNumber": true,
                        "requiredIf": "{symptom} contains 'whole'",
                        "choices": [
                            {
                                "value": "collapsed",
                                "text": "The plant has collapsed"
                            },
                            {
                                "value": "insect",
                                "text": "Fly-like insects are flying around the plant"
                            },
                            {
                                "value": "mark-brown",
                                "text": "Brown marks are visible on the entirety of the plant"
                            },
                            {
                                "value": "mark-white",
                                "text": "There are white spots all over the plant"
                            },
                            {
                                "value": "mush",
                                "text": "Mushy patches are present all over the plant, particularly towards the base or crown of the plant"
                            },
                            {
                                "value": "no-water",
                                "text": "The plant is wilting and is not recovering after being watered"
                            },
                            {
                                "value": "odor",
                                "text": "There is a pungent scent coming from the plant"
                            },
                            {
                                "value": "wilt",
                                "text": "The plant is wilting "
                            }
                        ],
                        "choicesOrder": "random",
                        "minSelectedChoices": 1
                    }
                ]
            },
            {
                "type": "radiogroup",
                "name": "symptom-init",
                "title": "Where did the symptoms first appear on the plant/",
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
                "name": "near",
                "title": "Are other nearby plants also affected?",
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
                "name": "water-panel",
                "elements": [
                    {
                        "type": "dropdown",
                        "name": "water-frequency",
                        "title": "How often do you water your plant?",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "often",
                                "text": "More than once a day"
                            },
                            {
                                "value": "daily",
                                "text": "Once a day"
                            },
                            {
                                "value": "few-day",
                                "text": "Once every few days"
                            },
                            {
                                "value": "week",
                                "text": "Once a week"
                            },
                            {
                                "value": "fortnight",
                                "text": "Once a fortnight"
                            },
                            {
                                "value": "month",
                                "text": "Once a month"
                            },
                            {
                                "value": "little",
                                "text": "Les than once a month"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "panel",
                "name": "mulch-panel",
                "elements": [
                    {
                        "type": "boolean",
                        "name": "mulch",
                        "title": "Is there mulch around the plant?",
                        "isRequired": true,
                        "swapOrder": true
                    },
                    {
                        "type": "boolean",
                        "name": "mulch-moist",
                        "visibleIf": "{mulch} = true",
                        "title": "Is the soil underneath the mulch moist?",
                        "hideNumber": true,
                        "requiredIf": "{mulch} = true",
                        "swapOrder": true
                    }
                ]
            },
            {
                "type": "panel",
                "name": "fertiliser-panel",
                "elements": [
                    {
                        "type": "boolean",
                        "name": "fertilise",
                        "title": "Do you fertilise the plant?",
                        "swapOrder": true
                    },
                    {
                        "type": "dropdown",
                        "name": "fertilise-frequency",
                        "visibleIf": "{fertilise} = true",
                        "title": "How Often do you Fertilise the Plant?",
                        "hideNumber": true,
                        "requiredIf": "{fertilise} = true",
                        "choices": [
                            {
                                "value": "often",
                                "text": "More than once a week"
                            },
                            {
                                "value": "week",
                                "text": "Once a week"
                            },
                            {
                                "value": "fortnight",
                                "text": "Once a fortnight"
                            },
                            {
                                "value": "month",
                                "text": "Once a month"
                            },
                            {
                                "value": "month-two",
                                "text": "Once every two months"
                            },
                            {
                                "value": "quarter",
                                "text": "Once every three months"
                            },
                            {
                                "value": "half",
                                "text": "Less than once every three months"
                            }
                        ]
                    }
                ]
            },
            {
                "type": "radiogroup",
                "name": "light",
                "title": "What light conditions is the plant in?",
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
    "showCompletedPage": false,
    "showPageNumbers": true
};