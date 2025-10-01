import mongoose, {Schema} from "mongoose"; 
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new Schema({
    videoFile: {
        type: String,   // cloudinary url
        required: true 
    },
    thumnail: {
        type: String,   
        required: true 
    },
    title: {
        type: String,   
        required: true 
    },
    discription: {
        type: String,   
        
    },
    duration: {
        type: Number,
        required: true,
    }, 
    isPublishe: {
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)