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
                    "name": "common-panel",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "common-know",
                            "title": "Do you know the Common Name of the Plant?\n",
                            "isRequired": true,
                            "labelTrue": "Yes",
                            "labelFalse": "No",
                            "swapOrder": true
                        },
                        {
                            "type": "text",
                            "name": "common-name",
                            "visibleIf": "{common-know} = true",
                            "title": "What is the Common Name of the Plant?",
                            "hideNumber": true,
                            "requiredIf": "{common-know} = true",
                            "placeholder": "Enter the Common Name here:"
                        }
                    ]
                },
                {
                    "type": "panel",
                    "name": "botanical-panel",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "botanical-know",
                            "title": "Do You Know the Botanical Name of the Plant?",
                            "isRequired": true,
                            "swapOrder": true
                        },
                        {
                            "type": "multipletext",
                            "name": "botanical-name",
                            "visibleIf": "{botanical-know} = true",
                            "title": "What is the Botanical Name of the Plant?",
                            "description": "Enter the Genus or the Genus and Species Name.",
                            "hideNumber": true,
                            "requiredIf": "{botanical-know} = true",
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
                    "visibleIf": "{botanical-know} = false and {common-know} = false",
                    "title": "What kind of Plant is it?",
                    "requiredIf": "{botanical-know} = false and {common-know} = false",
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
                    "name": "age-panel",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "age-know",
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
                            "name": "symptom-leaf",
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
                                    "value": "mold-grey",
                                    "text": "Fuzzy grey mold on the leaves"
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
                            "name": "leaf-insect",
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
                            "name": "symptom-flower",
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
                            "name": "symptom-stem",
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
                            "name": "symptom-root",
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
                            "name": "symptom-growth",
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
                            "name": "symptom-whole",
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
    "showPageNumbers": true
};

const survey = new Survey.Model(surveyJson);

survey.applyTheme({
    "themeName": "coffee",
    "colorPalette": "light",
    "isPanelless": false,
    "backgroundImage": "",
    "backgroundOpacity": 1,
    "backgroundImageAttachment": "scroll",
    "backgroundImageFit": "cover",
    "cssVariables": {
        "--sjs-editorpanel-backcolor": "rgba(242, 174, 114, 1)",
        "--sjs-editorpanel-hovercolor": "rgba(220, 83, 4, 1)",
        "--sjs-questionpanel-backcolor": "rgba(229, 221, 210, 1)",
        "--sjs-questionpanel-hovercolor": "rgba(242, 174, 114, 0.5)",
        "--sjs-questionpanel-cornerRadius": "10px",
        "--sjs-corner-radius": "10px",
        "--sjs-base-unit": "8px",
        "--sjs-font-pagetitle-family": "Brush Script MT, cursive",
        "--sjs-font-pagetitle-color": "rgba(92, 37, 19, 1)",
        "--sjs-font-pagedescription-color": "rgba(18, 18, 6, 1)",
        "--sjs-shadow-small": "0px 0px 0px 3px rgba(92, 37, 19, 1),-5px 5px 0px 5px rgba(191, 73, 4, 0.8)",
        "--sjs-font-questiontitle-color": "rgba(18, 18, 6, 1)",
        "--sjs-font-questiondescription-size": "12px",
        "--sjs-font-questiondescription-color": "rgba(18, 18, 6, 1)",
        "--sjs-shadow-inner": "0px 0px 0px 2px rgba(92, 37, 19, 1),0px -2px 0px 2px rgba(92, 37, 19, 1)",
        "--sjs-font-editorfont-color": "rgba(18, 18, 6, 1)",
        "--sjs-font-editorfont-placeholdercolor": "rgba(18, 18, 6, 1)",
        "--sjs-border-default": "rgba(0, 0, 0, 1)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.2)",
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(255, 216, 77, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(255, 216, 77, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(255, 216, 77, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 1)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 1)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 1)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 1)",
        "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
        "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(92, 37, 19, 1),0px 0px 0px 0px rgba(191, 73, 4, 0.8)",
        "--sjs-shadow-medium": "0px 0px 0px 2px rgba(0, 0, 0, 1)",
        "--sjs-shadow-large": "0px 6px 0px 0px rgba(0, 0, 0, 1)",
        "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(92, 37, 19, 1),0px 0px 0px 0px rgba(92, 37, 19, 1)",
        "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
        "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-green": "rgba(25, 179, 148, 1)",
        "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
        "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-blue": "rgba(67, 127, 217, 1)",
        "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
        "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
        "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-article-font-xx-large-textDecoration": "none",
        "--sjs-article-font-xx-large-fontWeight": "700",
        "--sjs-article-font-xx-large-fontStyle": "normal",
        "--sjs-article-font-xx-large-fontStretch": "normal",
        "--sjs-article-font-xx-large-letterSpacing": "0",
        "--sjs-article-font-xx-large-lineHeight": "64px",
        "--sjs-article-font-xx-large-paragraphIndent": "0px",
        "--sjs-article-font-xx-large-textCase": "none",
        "--sjs-article-font-x-large-textDecoration": "none",
        "--sjs-article-font-x-large-fontWeight": "700",
        "--sjs-article-font-x-large-fontStyle": "normal",
        "--sjs-article-font-x-large-fontStretch": "normal",
        "--sjs-article-font-x-large-letterSpacing": "0",
        "--sjs-article-font-x-large-lineHeight": "56px",
        "--sjs-article-font-x-large-paragraphIndent": "0px",
        "--sjs-article-font-x-large-textCase": "none",
        "--sjs-article-font-large-textDecoration": "none",
        "--sjs-article-font-large-fontWeight": "700",
        "--sjs-article-font-large-fontStyle": "normal",
        "--sjs-article-font-large-fontStretch": "normal",
        "--sjs-article-font-large-letterSpacing": "0",
        "--sjs-article-font-large-lineHeight": "40px",
        "--sjs-article-font-large-paragraphIndent": "0px",
        "--sjs-article-font-large-textCase": "none",
        "--sjs-article-font-medium-textDecoration": "none",
        "--sjs-article-font-medium-fontWeight": "700",
        "--sjs-article-font-medium-fontStyle": "normal",
        "--sjs-article-font-medium-fontStretch": "normal",
        "--sjs-article-font-medium-letterSpacing": "0",
        "--sjs-article-font-medium-lineHeight": "32px",
        "--sjs-article-font-medium-paragraphIndent": "0px",
        "--sjs-article-font-medium-textCase": "none",
        "--sjs-article-font-default-textDecoration": "none",
        "--sjs-article-font-default-fontWeight": "400",
        "--sjs-article-font-default-fontStyle": "normal",
        "--sjs-article-font-default-fontStretch": "normal",
        "--sjs-article-font-default-letterSpacing": "0",
        "--sjs-article-font-default-lineHeight": "28px",
        "--sjs-article-font-default-paragraphIndent": "0px",
        "--sjs-article-font-default-textCase": "none",
        "--sjs-general-backcolor-dim": "#F2AE72",
        "--sjs-primary-backcolor": "#5C2513",
        "--sjs-primary-backcolor-dark": "rgba(175, 70, 36, 1)",
        "--sjs-primary-backcolor-light": "rgba(347, 140, 72, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-special-red": "rgba(229, 221, 210, 1)",
        "--sjs-special-red-light": "rgba(191, 73, 4, 0.8)",
        "--sjs-font-headertitle-family": "Brush Script MT, cursive",
        "--sjs-font-headertitle-weight": "600",
        "--sjs-font-headertitle-color": "rgba(18, 18, 6, 1)",
        "--sjs-font-headerdescription-color": "rgba(18, 18, 6, 1)",
        "--sjs-header-backcolor": "transparent"
    },
    "header": {
        "titlePositionX": "center",
        "titlePositionY": "middle",
        "descriptionPositionX": "center"
    },
    "headerView": "basic"
});

document.addEventListener("DOMContentLoaded", function () { survey.render(document.getElementById("surveyContainer")); });

