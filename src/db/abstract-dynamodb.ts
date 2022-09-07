import { v4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { config, PAGINATED_MAX_LIMIT } from './db-config';
import {
  CreateDto,
  DeleteDto,
  Entity,
  GetDto,
  PaginatedData,
  PaginatedSearch,
  UpdateDto,
} from './types';

export abstract class DynamoService<T> {
  dynamoDb: DynamoDB.DocumentClient;
  tableName: string;

  protected constructor(tableName: string) {
    console.log(config);

    this.dynamoDb = new DynamoDB.DocumentClient({
      ...config,
    });
    this.tableName = tableName;
  }

  async getItem<T extends Entity>({ id }: GetDto<T>): Promise<T | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      const data = await this.dynamoDb.get(params).promise();
      return data.Item as T;
    } catch (err) {
      console.error(JSON.stringify(err, null, 4));
      return err;
    }
  }

  async getAllItems<T extends Entity>({
    limit,
    lastEvaluatedKey,
  }: PaginatedSearch): Promise<PaginatedData<T>> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
      Limit: !limit || limit > PAGINATED_MAX_LIMIT ? PAGINATED_MAX_LIMIT : limit,
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = {
        id: lastEvaluatedKey,
      };
    }

    try {
      const data = await this.dynamoDb.scan(params).promise();
      return {
        items: data.Items as [T],
        lastEvaluatedKey: data.LastEvaluatedKey?.id,
      };
    } catch (err) {
      console.error(JSON.stringify(err, null, 4));
      return err;
    }
  }

  async createItem<T extends Entity>(createDto: CreateDto<T>): Promise<T | null> {
    const item = {
      id: v4(),
      ...createDto,
    };

    const params: DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item,
    };

    try {
      await this.dynamoDb.put(params).promise();
      return item as T;
    } catch (err) {
      console.error(JSON.stringify(err, null, 4));
      return err;
    }
  }

  async updateItem<T extends Entity>({ id, patch }: UpdateDto<T>): Promise<T | null> {
    try {
      const item = await this.getItem({ id });

      if (!item) {
        return null;
      }

      const updatedItem = {
        ...item,
        ...patch,
      };

      const params: DocumentClient.PutItemInput = {
        TableName: this.tableName,
        Item: updatedItem,
      };

      await this.dynamoDb.put(params).promise();
      return updatedItem;
    } catch (err) {
      console.error(JSON.stringify(err, null, 4));
      return err;
    }
  }

  async deleteItem<T extends Entity>({ id }: DeleteDto<T>): Promise<T | null> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
      ReturnValues: 'ALL_OLD',
    };

    try {
      const data = await this.dynamoDb.delete(params).promise();
      return data.Attributes as T;
    } catch (err) {
      console.error(JSON.stringify(err, null, 4));
      return err;
    }
  }
}
