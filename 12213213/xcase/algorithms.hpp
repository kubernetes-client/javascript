#pragma once

#include <cstddef>

template<class chtype>
struct Algorithms {
  typedef chtype char_type;
  
  static inline bool isdigit(chtype c) {
    return c >= L'0' && c <= L'9';
  }
  static inline bool isupper(chtype c) {
    return c >= L'A' && c <= L'Z';
  }
  static inline bool islower(chtype c) {
    return c >= L'a' && c <= L'z';
  }
  static inline chtype toupper(chtype c) {
    if(islower(c)) {
      return c - (L'a' - L'A');
    }
    return c;
  }
  static inline chtype tolower(chtype c) {
    if(isupper(c)) {
      return c + (L'a' - L'A');
    }
    return c;
  }


  struct Camelize {
    inline static bool Run(const chtype* str, size_t len, chtype* out) {
      unsigned int j = 0;
      bool changed = false;
      if(isdigit(str[0]) || str[0] == L'-') {
        return false;
      }
    
      for(unsigned int i = 0; i < len; ++i) {
        auto c = str[i];
        if(c == L'_' || c == L' ' || c == L'-') {
          changed = true;
          c = str[++i]; 
          if(c == 0) {
            return false;
          }
          out[j++] = toupper(c);
        } else if(i == 0 && isupper(c)) {
          changed = true;
          out[j++] = tolower(c);
        } else {
          out[j++] = c;
        }
      }
      out[j] = 0;
      return changed;
    }
  };

  struct Decamelize {
    inline static bool Run(const chtype* str, size_t len, chtype* out, chtype separator = L'_') {
      unsigned int j = 0;
      if(!islower(str[0])) {
        return false;
      }
      bool changed = false;
      for(unsigned int i = 0; i < len; ++i) {
        auto c = str[i];
        if(isupper(c)) {
          out[j++] = separator;
          out[j++] = tolower(c);
          changed = true;
        } else {
          out[j++] = c;
        }
      }
      out[j] = 0;
      return changed;
    }
  };

  struct Pascalize {
    inline static bool Run(const chtype* str, size_t len, chtype* out) {
      unsigned int j = 0;
      bool changed = false;
      if(isdigit(str[0]) || str[0] == L'-') {
        return false;
      }
      for(unsigned int i = 0; i < len; ++i) {
        auto c = str[i];
        if(c == L'_' || c == L' ' || c == L'-') {
          changed = true;
          c = str[++i]; 
          if(c == 0) {
            return false;
          }
          out[j++] = toupper(c);
        } else if(i == 0 && islower(c)) {
          changed = true;
          out[j++] = toupper(c);
        } else {
          out[j++] = c;
        }
      }
      out[j] = 0;
      return changed;
    }
  };

  struct Depascalize {
    inline static bool Run(const chtype* str, size_t len, chtype* out, chtype separator = L'_') {
      unsigned int j = 0;
      
      if(!isupper(str[0])) {
        return false;
      }
      bool changed = false;
      for(unsigned int i = 0; i < len; ++i) {
        auto c = str[i];
        if(isupper(c)) {
          if(i > 0) { 
            out[j++] = separator;
          }
          out[j++] = tolower(c);
          changed = true;
        } else {
          out[j++] = c;
        }
      }
      out[j] = 0;
      return changed;
    }
  };
};
