import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
  DataType,
  AutoIncrement,
} from "sequelize-typescript";

export interface FileAttributes {
  id?: string;
  content: Buffer;
}

@Table({
  timestamps: true,
  tableName: "files",
})
class File extends Model<FileAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @AllowNull(true)
  @Column({
    type: DataType.BLOB,
  })
  declare content: Buffer;

  @CreatedAt
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
  declare updated_at: Date;
}

export default File;
