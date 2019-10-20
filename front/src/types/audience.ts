export function TextForAudience(audience : Audience) {
    if (audience == Audience.Professional) return "Professional";
    if (audience == Audience.Enthusiast) return "Enthusiast";
    if (audience == Audience.Junior) return "Junior Astronaut";
}

export enum Audience {
    Professional = 3,
    Enthusiast = 2,
    Junior = 1
}