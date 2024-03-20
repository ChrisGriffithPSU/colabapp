import mongoose, { Model, Schema, model } from 'mongoose';
import { IDocument } from '@chrisgriffithpsu/colab-shared/src';

const documentSchema: Schema = new Schema(
    {
        ownerId: { type: mongoose.Schema.Types.ObjectId, index: true },
        adminIds: [{ type: mongoose.Schema.Types.ObjectId }],
        members: [{ type: String }],
        title: { type: String, required: true },
        theme: [{ type: String }],
        privacy: { type: String },
        turnStyle: { type: String },
        topContributors: [{ type: String }],
        currentlyOnline: { type: Number },
        totalContributions: { type: Number },
        isTodaysTopColabs: { type: Boolean },
        isHallOfFame: { type: Boolean },
        views: { type: Number },
        wordCount: { type: Number },
        elo: { type: Number },
        createdAt: { type: Date, default: Date.now },
        sortId: { type: Number }
    },
    {
        versionKey: false,
        toJSON: {
            transform(_doc, rec) {
                rec.id = rec._id;
                delete rec._id;
                return rec;
            }
        }
    }
);

documentSchema.virtual('id').get(function() { return this._id });

const DocumentModel: Model<IDocument> = model<IDocument>('Document', documentSchema, 'Document');
export { DocumentModel };