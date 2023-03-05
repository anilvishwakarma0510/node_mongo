const BlogModel = require("../../models/blogSchema");

exports.add_blog = async (req,res) => {
    const { title , added_by, description } = req.body;

    if(!title || !added_by || !description){
        res.status(400).json({
            status:0,
            message:'Check parameter'
        });
        return;
    }

    try {

        const newBlog = new BlogModel({
            title,
            added_by,
            description
        });

        const response = await newBlog.save();

        res.status(200).json({
            status:1,
            message:'Blog has been created successfully.',
        });
    } catch (error) {
        res.status(500).json({
            status:0,
            message:'Something went wrong!',
        });
    }
};