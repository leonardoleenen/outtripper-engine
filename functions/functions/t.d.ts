declare module 'uuid4';
type TokenOuttripper = {
  id: string
  userCn: string
  organizationId?: string
  organizationCn?: string
  rol?: string
}

type User = {
  cn: string
  email: string
  photoAvatar: string
  status: string
}

type DealAccess = {
  organization: string
  rol: string
}

type Organization = {
  cn: string 
  kind: 'LODGE' | 'AGENCY ' 
}