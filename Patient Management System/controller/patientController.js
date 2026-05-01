import Patient from "../model/patientModel.js";

export const create = async (req, res) => {
    try {
        const patientData = new Patient(req.body);
        const { name } = patientData;
        const patientExist = await Patient.findOne({ name });
        if (patientExist) {
            return res.status(400).json({ message: "Patient already exists!" });
        }
        const savedPatient = await patientData.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const fetch = async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients.length === 0) {
            return res.status(404).json({ message: "Patients not found!" });
        }
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        // Corrected 'patient' to 'Patient'
        const patientExist = await Patient.findOne({ _id: id });
        if (!patientExist) {
            return res.status(404).json({ message: "Patient not found!" });
        }
        const updatePatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatePatient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}

export const deletePatient = async (req, res) => {
    try {
        const id = req.params.id;
        const patientExist = await Patient.findOne({ _id: id });
        if (!patientExist) {
            return res.status(404).json({ message: "Patient not found!" });
        }
        await Patient.findByIdAndDelete(id);
        res.status(201).json({ message: "Patient deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
}
