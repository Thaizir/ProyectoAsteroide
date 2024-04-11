class Asteroid {
    constructor(name, diameter, hazardous) {

        const errors = [];
        if (!name || typeof name !== 'string') {
            errors.push('Nombre de asteroide invalido o nulo');
        }

        if (!diameter) {
            errors.push('Diametro de asteroide invalido o nulo');
        }

        if (typeof hazardous !== 'boolean') {
            errors.push('Hazardous debe ser un booleano');
        }

        if (errors.length > 0) {
            throw {
                type: "validation_error",
                errors: errors
            };
        }

        this.name = name;
        this.diameter = diameter;
        this.hazardous = hazardous;
    }
}

module.exports = Asteroid;