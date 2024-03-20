//
//  KeyboardTool.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import SwiftUI

struct KeyboardTool: View {
    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Button {
                    
                } label: {
                    Image("exit")
                }
                
                Spacer()
                
                MoreKeyboardTool()
                
                Spacer()
                
                Button {
                    
                } label: {
                    Text("Done")
                        .foregroundStyle(.white)
                        .font(Font.custom("KumbhSans-Regular_Bold", size: 12))
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(Color("button"))
                        .clipShape(Capsule())
                }
            }
            .padding(.horizontal)
            
            // Core Keyboard Tools
            HStack {
                Text("5:00")
                    .font(Font.custom("KumbhSans-Regular_SemiBold", size: 16))
                    .foregroundStyle(.white)
                    .padding(.trailing, 8)
                
                Image("divider")
                
                Button {
                    
                } label: {
                    RoundedRectangle(cornerRadius: 8)
                        .frame(width: 32, height: 32)
                        .foregroundStyle(Color("green"))
                }
                .padding(.horizontal, 8)
                
                Image("divider")
                    .padding(.trailing, 8)
                
                HStack(spacing: 16) {
                    Button {
                        
                    } label: {
                        Image("undo")
                    }
                    
                    Button {
                        
                    } label: {
                        Image("redo")
                    }
                    
                    Button {
                        
                    } label: {
                        Image("autocomplete")
                    }
                }
                
                Image("divider")
                    .padding(.horizontal, 8)
                
                Button {
                    
                } label: {
                    Image("more")
                }
                .padding(.trailing, 6)
                
                Button {
                    
                } label: {
                    HStack(spacing: 8) {
                        Text("Generate")
                            .foregroundStyle(.white)
                            .font(Font.custom("KumbhSans-Regular_SemiBold", size: 12))
                        Image("sparkle")
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(Color("generateButton"))
                    .clipShape(RoundedRectangle(cornerRadius: 4))
                    .shadow(radius: 5)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(Color("keyboardtools"))
            .clipShape(UnevenRoundedRectangle(cornerRadii: .init(topLeading: 8, topTrailing: 8)))
        }
    }
}

#Preview {
    KeyboardTool()
}
