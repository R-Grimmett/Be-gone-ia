function fetchDescription(category, tag) {
    switch (category) {
        case "leaf":
            switch (tag) {
                case "blotch-brown":
                    return "Brown blotches on the leaves.";
                case "blotch-downy":
                    return "Purple or green blotches on the leaves.";
                case "blotch-yellow":
                    return "Yellow blotches on the leaves.";
                case "curled":
                    return "Leaves are curled in on themselves, or distorted.";
                case "dropped":
                    return "Leaves are dropped by the plant.";
                case "growth-mold":
                    return "Growth similar to mold on the undersides of leaves.";
                case "growth-rust":
                    return "Rust coloured pustules on the undersides of leaves.";
                case "leaf-black":
                    return "Leaves are black in colour.";
                case "leaf-brown":
                    return "Leaves are brown in colour.";
                case "leaf-mottled":
                    return "Leaves are mottled.";
                case "leaf-red":
                    return "Leaves become red or more red in colouration.";
                case "leaf-silvery":
                    return "Leaves are silvery, or have silvery lines or spots on them.";
                case "leaf-skeleton":
                    return "Leaves become skeletal, leaving only the veins.";
                case "leaf-translucent":
                    return "Leaves become translucent in colouration.";
                case "mosaic":
                    return "Mosaic pattern on the leaves.";
                case "mush":
                    return "Leaves turn mushy in spots or blotches on the leaves.";
                case "notch":
                    return "Leaves have notches missing from the edges of them.";
                case "odema":
                    return "Odema, or small bumps forming on the leaves.";
                case "ring":
                    return "Ring patterns on the leaves.";
                case "scab":
                    return "Light brown patches or raised scabs of a light brown colour on the leaves or pads of the plant.";
                case "scale":
                    return "Scale, or small, hard, bumps or shells on the leaves.";
                case "scorch":
                    return "Leaves are scorched, or have portions of brown or black that appear similar to a burn.";
                case "speck":
                    return "Yellowish swelling or specks on the undersides of leaves.";
                case "spot-brown":
                    return "Black or brown spots on the leaves.";
                case "spot-black":
                    return "Tiny black spots on the leaves.";
                case "streak-pale":
                    return "Pale green or yellow streaks throughout the leaves.";
                case "substance-fluffy":
                    return "White fluffy substance on the leaves.";
                case "substance-mold":
                    return "Fuzzy grey mold on the leaves";
                case "substance-sticky":
                    return "Honeydew, or a sticky substance on the leaves.";
                case "substance-web":
                    return "Small, silvery, webs on the leaves of the plant.";
                case "substance-white":
                    return "White, powdery substance on the leaves of the plant.";
                case "insect (pale-green)":
                    return "Small, pale green insects about 3mm in length that fly short distances when disturbed.";
                case "insect (night)":
                    return "Small insects that only appear at night.";
                case "insect (cloud)":
                    return "Clouds of insects flying around the plant.";
                case "insect (black)":
                    return "Small, black, insects.";
                case "insect (aphid)":
                    return "Small insects, black or green in colour, about 1-7mm in length.";
                default:
                    return "";
            }
        case "flower":
            switch (tag) {
                case "black":
                    return "Flower buds turning black.";
                case "drop":
                    return "Flower buds are dropping before fully forming or opening.";
                case "none":
                    return "No flowers are forming for an extended period of time";
                case "pale":
                    return "New flowers are pale or desaturated in colour.";
                case "substance-sticky":
                    return "Flowers have a sticky substance on them";
                case "substance-white":
                    return "Flowers have a white, powdery substance on them";
                case "white":
                    return "Flowers have white or pale streaks in them.";
                default:
                    return "";
            }
        case "stem":
            switch (tag) {
                case "black":
                    return "The tips of the stem turn black.";
                case "etiolated":
                    return "The stems are etiolated, lopsided or 'stretched-out.";
                case "insect":
                    return "Clusters of insects around 1-7mm in length can be seen on the stems.";
                case "mark-brown":
                    return "Brown marks visible on the stems of the plant.";
                case "mark-wet":
                    return "Brown patches with a wet appearance to them on the stems of the plant.";
                case "scale":
                    return "Scale, or small, hard bumps on the stems of the plant.";
                case "scorch":
                    return "Stems are scorched, have burn marks or pale brown patches.";
                case "substance-fluffy":
                    return "Stems have a white, fluffy substance on them.";
                case "substance-sticky":
                    return "There is a sticky substance on the stems.";
                case "substance-web":
                    return "Silky webs are present on the stems.";
                default:
                    return "";
            }
        case "root":
            switch (tag) {
                case "rot":
                    return "Roots are mushy, dark brown, or black.";
                case "insect":
                    return "Earwigs can be seen during the day hiding in the soil.";
                case "maggot":
                    return "Small white maggots can be found in the soil";
                case "aphid":
                    return "Small black or green bugs in the soil next to the roots";
                case "wool":
                    return "White, wooly clumps can be seen next to or on the roots.";
                case "grub":
                    return "White grubs with brown heads can be seen in the soil. The roots may also be damaged.";
                default:
                    return "";
            }
        case "growth":
            switch (tag) {
                case "slow":
                    return "Any new growth is slow or stunted";
                case "etiolated":
                    return "New growth is etiolated, lopsided, or 'stretched-out'.";
                case "fast":
                    return "New growth occurs rapidly, and is softer than other parts of the plant";
                case "distorted":
                    return "New growth is distorted or misshapen."
                default:
                    return "";
            }
        case "whole":
            switch (tag) {
                case "collapsed":
                    return "The plant has collapsed.";
                case "insect":
                    return "Fly-like insects around the plant.";
                case "mark-brown":
                    return "Brown marks visible on the entirety of the plant.";
                case "mark-white":
                    return "Small white spots over the entire plant.";
                case "mush":
                    return "Mushy patches, particularly towards the base or crown of the plant.";
                case "no-water":
                    return "The plant appears withered and does not recover after being watered.";
                case "odor":
                    return "A pungent scent coming from the plant or substrate of the plant.";
                case "wilt":
                    return "The plant is wilting or shrivelled.";
                default:
                    return "";
            }
        default:
            return "";
    }
}

function fetchShort(category, tag) {
    switch (category) {
        case "leaf":
            switch (tag) {
                case "blotch-brown":
                    return "Brown Blotches";
                case "blotch-downy":
                    return "Purple or Green Blotches";
                case "blotch-yellow":
                    return "Yellow Blotches";
                case "curled":
                    return "Curled or Distorted Leaves";
                case "dropped":
                    return "Dropped Leaves";
                case "growth-mold":
                    return "Mold-Like Growth";
                case "growth-rust":
                    return "Rust";
                case "leaf-black":
                    return "Black Leaves";
                case "leaf-brown":
                    return "Brown Leaves";
                case "leaf-mottled":
                    return "Mottled Leaves";
                case "leaf-red":
                    return "Red Leaves";
                case "leaf-silvery":
                    return "Silvery Leaves";
                case "leaf-skeleton":
                    return "Skeletal Leaves";
                case "leaf-translucent":
                    return "Translucent Leaves";
                case "mosaic":
                    return "Mosaic pattern on the leaves.";
                case "mush":
                    return "Mushy, Brown Patches";
                case "notch":
                    return "Notches in Leaves";
                case "odema":
                    return "Odema";
                case "ring":
                    return "Ring Patterns";
                case "scab":
                    return "Scabs";
                case "scale":
                    return "Scale";
                case "scorch":
                    return "Scorched Leaves";
                case "speck":
                    return "Yellowish Swelling or Specks";
                case "spot-brown":
                    return "Black or Brown Spots";
                case "spot-black":
                    return "Tiny black spots on the leaves.";
                case "streak-pale":
                    return "Pale green or Yellow Streaks";
                case "substance-fluffy":
                    return "White Fluffy Substance";
                case "substance-mold":
                    return "Fuzzy Grey Mold";
                case "substance-sticky":
                    return "Sticky Substance";
                case "substance-web":
                    return "Webs on the Leaves";
                case "substance-white":
                    return "White, Powdery Substance";
                case "insect (pale-green)":
                    return "Pale Green Insects";
                case "insect (night)":
                    return "Nocturnal Insects";
                case "insect (cloud)":
                    return "Clouds of Insects";
                case "insect (black)":
                    return "Small, Black, Insects.";
                case "insect (aphid)":
                    return "Black or Green Insects, 1-7mm";
                default:
                    return "";
            }
        case "flower":
            switch (tag) {
                case "black":
                    return "Flower Buds Turning Black.";
                case "drop":
                    return "Dropped Flower Buds";
                case "none":
                    return "No Flowers";
                case "pale":
                    return "Desaturated or Pale Flowers";
                case "substance-sticky":
                    return "Sticky Substance";
                case "substance-white":
                    return "White, Powdery Substance";
                case "white":
                    return "White or Pale Streaks";
                default:
                    return "";
            }
        case "stem":
            switch (tag) {
                case "black":
                    return "Black Stem Tips";
                case "etiolated":
                    return "Etiolated";
                case "insect":
                    return "Insect Clusters, 1-7mm";
                case "mark-brown":
                    return "Brown Marks";
                case "mark-wet":
                    return "Wet, Brown Marks";
                case "scale":
                    return "Scale";
                case "scorch":
                    return "Scorch";
                case "substance-fluffy":
                    return "White, Fluffy Substance";
                case "substance-sticky":
                    return "Sticky Substance";
                case "substance-web":
                    return "Webs";
                default:
                    return "";
            }
        case "root":
            switch (tag) {
                case "rot":
                    return "Rotted Roots";
                case "insect":
                    return "Nocturnal Insects";
                case "maggot":
                    return "Maggots";
                case "aphid":
                    return "Black or Green Insects";
                case "wool":
                    return "White, Wooly, Clumps";
                case "grub":
                    return "Grubs";
                default:
                    return "";
            }
        case "growth":
            switch (tag) {
                case "slow":
                    return "Slow Growth";
                case "etiolated":
                    return "Etiolated Growth";
                case "fast":
                    return "Rapid Growth";
                case "distorted":
                    return "Distorted Growth";
                default:
                    return "";
            }
        case "whole":
            switch (tag) {
                case "collapsed":
                    return "Collapsed";
                case "insect":
                    return "Fly-like Insects";
                case "mark-brown":
                    return "Brown Marks";
                case "mark-white":
                    return "Small White Spots";
                case "mush":
                    return "Mushy Patches";
                case "no-water":
                    return "Not Recovering after Water";
                case "odor":
                    return "Odor";
                case "wilt":
                    return "Wilting";
                default:
                    return "";
            }
        default:
            return "";
    }
}