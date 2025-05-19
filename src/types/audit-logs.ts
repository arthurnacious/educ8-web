export interface AuditLog {
  userId: string;
  action: string;
  model: string;
  modelId: string;
  before: JSON;
  after: JSON;
  createdAt: Date;
}
