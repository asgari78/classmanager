// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gghxnqfwfnkjkwnhzfpn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaHhucWZ3Zm5ramt3bmh6ZnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDEzMTcsImV4cCI6MjA3MjIxNzMxN30.CD363VZ_NSfVNDw7uIGzbeTvG0kjLnSD1gFy60wUXYI"

export const supabase = createClient(supabaseUrl, supabaseKey)