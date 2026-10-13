// TypeScript types for the database, in the format `supabase gen types`
// produces. They let your editor autocomplete column names and catch typos.
//
// Regenerate after changing a migration (needs `npx supabase link` first):
//   npm run db:types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content_md: string;
          cover_image_url: string | null;
          cover_image_alt: string | null;
          tags: string[];
          status: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content_md?: string;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          tags?: string[];
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content_md?: string;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          tags?: string[];
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description_md: string;
          category: string;
          tech: string[];
          tags: string[];
          github_url: string | null;
          demo_url: string | null;
          cover_image_url: string | null;
          cover_image_alt: string | null;
          featured: boolean;
          sort_order: number;
          status: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          description_md?: string;
          category: string;
          tech?: string[];
          tags?: string[];
          github_url?: string | null;
          demo_url?: string | null;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          featured?: boolean;
          sort_order?: number;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          description_md?: string;
          category?: string;
          tech?: string[];
          tags?: string[];
          github_url?: string | null;
          demo_url?: string | null;
          cover_image_url?: string | null;
          cover_image_alt?: string | null;
          featured?: boolean;
          sort_order?: number;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          ip_hash: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          ip_hash: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          ip_hash?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicTables = Database["public"]["Tables"];
export type Post = PublicTables["posts"]["Row"];
export type Project = PublicTables["projects"]["Row"];
export type ContactMessage = PublicTables["contact_messages"]["Row"];
