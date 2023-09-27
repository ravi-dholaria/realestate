import propertyModel from "../models/propertyModel.js";

export const listPropertiesController = async (req, res) => {
        try {
            const properties = await propertyModel.find({});
            res.status(200).send({
                success: true,
                message: "All listed properties",
                properties
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                error,
                message: "Error while collecting all listed properties!!!"
            });
        }
};

// Add property 
export const addpropertyController = async (req, res) => {
    try {
        const { propertyName, propertyType, propertyPrice, propertyLocation, propertyAvailDate } = req.body;
        // Validation
        switch (true) {
            case !propertyName:
                return res.status(500).send({ error: "propertyName is Required!" });
            case !propertyType:
                return res.status(500).send({ error: "propertyType is Required!" });
            case !propertyLocation:
                return res.status(500).send({ error: "propertyLocation is Required!" });
            case !propertyPrice:
                return res.status(500).send({ error: "propertyPrice is Required!" });
            case !propertyAvailDate:
                return res.status(500).send({ error: "propertyAvailDate is Required!" });
        }
        const property = await new propertyModel({ ...req.body, propertyOwner: req.user._id }).save();
        res.status(200).send({
            success: true,
            message: "Property Added Successfully.",
            property
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while Adding property!!!'
        })
    }
};
// read my property
export const myPropertiesController = async (req, res) => {
    try {
        const myproperties = await propertyModel.find({ propertyOwner: req.user._id });
        res.status(200).send({
            success: true,
            message: "All owned properties by User",
            myproperties
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching my properties!!"
        });
    }
};
// Update Property
export const updatePropertyController = async (req, res) => {
    try {
    const updatedData = req.body ;
    const { id } = req.params;

    const property = await propertyModel.findOneAndUpdate({ _id: id, propertyOwner: req.user._id }, updatedData, { new: true });
    if (property) {
    console.log('Updated Property:', updatedData);
    }
    else {
        return res.status(500).send({
        success: false,
        message: "Property not found or user does not own the property."
        });
    }  

    res.status(200).send({
      success: true,
      messsage: "property Updated Successfully",
      property,
    });

    } catch (error) {
    res.status(500).send({
      success: false,
      error:error.message,
      message: "Error while updating property"
    });
  }
};
// Delete Property
export const deletePropertyController = async (req, res) => {
    try {
        const { id } = req.params;
    const deleteData = await propertyModel.deleteOne({ _id: id, propertyOwner: req.user._id }); 
    if (deleteData.deletedCount) {
        res.status(200).send({
            success: true,
            deleteData
        });
    } else {
        res.status(500).send({
            success: false,
            message:"Either property not found or you not authorized to delete property."
        })
    }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
};