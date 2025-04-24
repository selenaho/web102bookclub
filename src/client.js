import { createClient } from '@supabase/supabase-js'

const URL = 'https://ulpwzmymbdajqomsxggj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHd6bXltYmRhanFvbXN4Z2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjczNTcsImV4cCI6MjA2MTA0MzM1N30.UIpORQ0JXQdjQCFc6GadNe_2_tEZKcWxkkVSkOnFxVw';
export const supabase = createClient(URL, API_KEY);