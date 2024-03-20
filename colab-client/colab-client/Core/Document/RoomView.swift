//
//  RoomView.swift
//  colab-client
//
//  Created by Chris Griffith on 2/26/24.
//

import SwiftUI

struct RoomView: View {
    @State var text: String = ""
    @State var isEditing: Bool = false
    
    var body: some View {
        VStack {
            // Top Section
            HStack {
                HStack(spacing: 8) {
                    Image("chevron")
                    Text("Back")
                        .foregroundStyle(.white)
                        .font(Font.custom("KumbhSans-Regular", size: 14))
                }
                
                Spacer()
                
                Image("menu")
            }
            
            Text("Avatar The Last Airbender")
                .foregroundStyle(.white)
                .font(Font.custom("KumbhSans-Regular_Bold", size: 20))
                .padding(.top, 23)
                .padding(.bottom, 16)
            
            HStack {
                DocTextView(text: "fruits of work must never ever ever and I mea", background: "pink", accent: "pinkAccent")
            }
            
            if isEditing {
                TextField("", text: $text)
                    .foregroundStyle(.white)
                    .font(Font.custom("KumbhSans-Regular", size: 16))
                    .toolbar {
                        ToolbarItemGroup(placement: .keyboard) {
                            KeyboardToolRefactor()
                        }
                    }
            }
            
            Spacer()
            
            // Join Queue Button
            Button {
                isEditing = true
            } label: {
                Text("Join Queue")
                    .font(Font.custom("KumbhSans-Regular_Bold", size: 20))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 100)
                    .padding(.vertical, 12)
                    .background(Color("button"))
                    .clipShape(RoundedRectangle(cornerRadius: 8))
            }
        }
        .preferredColorScheme(/*@START_MENU_TOKEN@*/.dark/*@END_MENU_TOKEN@*/)
        .padding(.horizontal, 19)
        .padding(.vertical)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color("background"))
    }
}

#Preview {
    RoomView()
}

struct KeyboardToolRefactor: View {
    var body: some View {
        HStack {
            Text("5:00")
                .font(Font.custom("KumbhSans-Regular_SemiBold", size: 16))
                .foregroundStyle(.white)
                .padding(.trailing, 2)
            
            Image("divider")
            
            Button {
                
            } label: {
                RoundedRectangle(cornerRadius: 8)
                    .frame(width: 28, height: 28)
                    .foregroundStyle(Color("green"))
            }
            .padding(.horizontal, 2)
            
            Image("divider")
                .padding(.trailing, 2)
            
            HStack(spacing: 4) {
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
                .padding(.horizontal, 2)
            
            Button {
                
            } label: {
                Image("more")
            }
            //                                .padding(.trailing, 2)
            
            Button {
                
            } label: {
                HStack(spacing: 2) {
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
