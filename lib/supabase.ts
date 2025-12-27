
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sxkryiuahiypfiajonno.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4a3J5aXVhaGl5cGZpYWpvbm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MTk5MDYsImV4cCI6MjA4MjA5NTkwNn0.9oA91opKTMAy1KttDSoz0jvNm15F24s8iWzAZ6il63M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
