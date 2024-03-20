//
//  MoreKeyboardTool.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import SwiftUI

struct MoreKeyboardTool: View {
    var body: some View {
        HStack {
            Button {
                
            } label: {
                Image("image")
                    .padding(.trailing, 6)
            }
            
            Image("divider")
                .padding(.trailing, 10)
            
            
            HStack(spacing: 16) {
                Button {
                    
                } label: {
                    Image("bold")
                }
                
                Button {
                    
                } label: {
                    Image("strikethrough")
                }
                
                Button {
                    
                } label: {
                    Image("italic")
                }
                
                Button {
                    
                } label: {
                    Image("underline")
                }
            }
            
            Image("divider")
                .padding(.leading, 10)
            
            Button {
                
            } label: {
                Image("texttospeech")
                    .padding(.leading, 6)
            }
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 8)
        .background(Color("keyboardtools"))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

#Preview {
    MoreKeyboardTool()
}
