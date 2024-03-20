//
//  SelectHighlightColor.swift
//  colab-client
//
//  Created by Chris Griffith on 2/27/24.
//

import SwiftUI

struct SelectHighlightColor: View {
    @State var colorsTop = [["pink", "pinkAccent"], ["blue", "blueAccent"], ["green", "greenAccent"], ["lightblue", "lightblueAccent"], ["yellow", "yellowAccent"], ["red", "redAccent"]]
    @State var colorsBottom = [["lightblue", "lightblueAccent"], ["pink", "pinkAccent"], ["blue", "blueAccent"], ["green", "greenAccent"], ["red", "redAccent"]]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Color")
                .font(Font.custom("KumbhSans-Regular_Bold", size: 14))
                .foregroundStyle(.white)
            
            VStack(alignment: .leading) {
                HStack(spacing: 8) {
                    ForEach(colorsTop, id: \.self) { color in
                        Button {
                            
                        } label: {
                            ColorSquare(primary: color[0], secondary: color[1])
                        }
                    }
                }
                
                HStack(spacing: 8) {
                    ForEach(colorsBottom, id: \.self) { color in
                        Button {
                            
                        } label: {
                            ColorSquare(primary: color[0], secondary: color[1])
                        }
                    }
                }
            }
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 16)
        .background(Color("keyboardtools"))
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

#Preview {
    SelectHighlightColor()
}

struct ColorSquare: View {
    @State var primary: String
    @State var secondary: String
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .frame(width: 34, height: 34)
                .foregroundStyle(Color(secondary))
            
            RoundedRectangle(cornerRadius: 8)
                .frame(width: 32, height: 32)
                .foregroundStyle(Color(primary))
        }
    }
}
