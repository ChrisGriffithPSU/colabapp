//
//  DetailsComponent.swift
//  colab-client
//
//  Created by Chris Griffith on 2/26/24.
//

import SwiftUI

struct DetailsComponent: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 16)
            .frame(width: 319, height: 138)
            .foregroundStyle(.pink)
            .shadow(radius: 8)
    }
}

#Preview {
    DetailsComponent()
}
