import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'notes',
  }
})
export class Note {
  @prop({ required: true })                     public title!: string;
  @prop({ required: true })                     public content!: string;
  @prop({ type: () => [String] })               public tags!: string[];
  @prop({ default: false })                     public isPinned!: boolean;
  @prop({ type: () => Date })                   public createdAt!: Date;
  @prop({ type: () => Date })                   public updatedAt!: Date;
  @prop({ required: true })                     public coverPath!: string;
}

export const NoteModel = getModelForClass(Note);