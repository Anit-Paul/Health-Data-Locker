import DetailsModel from "../models/Details.js";

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

async function saveAPI(req, res) {
  try {
    const userId = req.user.id;
    const {
      name,
      dob,
      gender,
      bloodGroup,
      contact,
      emergencyContact,
      birthMark,
      physicalDisability,
    } = req.body;
    const age = calculateAge(dob);
    const newDetails = new DetailsModel({
      userId,
      name,
      dob,
      age,
      gender,
      bloodGroup,
      contact,
      emergencyContact,
      birthMark,
      physicalDisability,
    });
    await newDetails.save();
    return res.status(200).json({
      message: "Medical details saved successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from saveAPI",
      error: err,
    });
  }
}
async function fetchAPI(req, res) {
  try {
    const userId = req.user.id;
    const userData=await DetailsModel.find({userId});
    if (!userData) {
      return res.status(404).json({ message: "No medical details found" });
    }
    //console.log(userData)
    return res.status(201).json({
        user:userData
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from fetchAPI",
      error: err,
    });
  }
}
export { saveAPI, fetchAPI };
